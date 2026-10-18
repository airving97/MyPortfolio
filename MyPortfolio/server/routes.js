import {Router} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {Contact,Project,Qualification,User} from './models.js';
export const apiRouter=Router();
const asyncHandler=fn=>(req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
const safeUser=u=>({id:u.id,name:u.name,email:u.email,created:u.created,updated:u.updated});
const tokenFor=u=>jwt.sign({sub:u.id},process.env.JWT_SECRET,{expiresIn:'2h'});
function authenticate(req,res,next){
 const token=req.headers.authorization?.match(/^Bearer (.+)$/i)?.[1];
 if(!token)return res.status(401).json({error:'Authentication required'});
 try{req.auth=jwt.verify(token,process.env.JWT_SECRET);next()}catch{return res.status(401).json({error:'Invalid or expired token'})}
}
apiRouter.post('/auth/signin',asyncHandler(async(req,res)=>{
 const u=await User.findOne({email:String(req.body.email||'').toLowerCase()}).select('+password');
 if(!u || !await bcrypt.compare(String(req.body.password||''),u.password))return res.status(401).json({error:'Invalid credentials'});
 res.json({token:tokenFor(u),user:safeUser(u)});
}));
// JWT sign-out is performed client-side by discarding the token.
apiRouter.post('/auth/signout',authenticate,(_req,res)=>res.json({message:'Signed out. Discard your token.'}));
apiRouter.get('/auth/me',authenticate,asyncHandler(async(req,res)=>{
 const u=await User.findById(req.auth.sub);if(!u)return res.status(404).json({error:'User not found'});res.json(safeUser(u));
}));
function crud(name,Model,{publicCreate=false,user=false}={}){
 const router=Router();
 router.get('/',authenticate,asyncHandler(async(_req,res)=>res.json(user?(await Model.find()).map(safeUser):await Model.find())));
 router.get('/:id',authenticate,asyncHandler(async(req,res)=>{
 const doc=await Model.findById(req.params.id);if(!doc)return res.status(404).json({error:'Not found'});res.json(user?safeUser(doc):doc);
 }));
 router.post('/',publicCreate?(req,res,next)=>next():authenticate,asyncHandler(async(req,res)=>{
 const data={...req.body};if(user){data.password=await bcrypt.hash(String(data.password||''),12);data.updated=new Date()}
 const doc=await Model.create(data);res.status(201).json(user?safeUser(doc):doc);
 }));
 router.put('/:id',authenticate,asyncHandler(async(req,res)=>{
 const data={...req.body};delete data._id;delete data.id;
 if(user){if(data.password)data.password=await bcrypt.hash(String(data.password),12);else delete data.password;data.updated=new Date()}
 const doc=await Model.findByIdAndUpdate(req.params.id,{$set:data},{new:true,runValidators:true});
 if(!doc)return res.status(404).json({error:'Not found'});res.json(user?safeUser(doc):doc);
 }));
 router.delete('/:id',authenticate,asyncHandler(async(req,res)=>{
 const doc=await Model.findByIdAndDelete(req.params.id);if(!doc)return res.status(404).json({error:'Not found'});res.json({message:'Deleted'});
 }));
 router.delete('/',authenticate,asyncHandler(async(_req,res)=>res.json(await Model.deleteMany({}))));
 apiRouter.use('/'+name,router);
}
crud('contacts',Contact,{publicCreate:true});crud('projects',Project);crud('qualifications',Qualification);crud('users',User,{user:true});
// Registration is available for initial account creation; protect/remove this endpoint in production.
apiRouter.post('/auth/register',asyncHandler(async(req,res)=>{
 const {name,email,password}=req.body;
 if(!name||!email||typeof password!=='string'||password.length<8)return res.status(400).json({error:'Name, email and password (8+ characters) required'});
 const u=await User.create({name,email,password:await bcrypt.hash(password,12)});
 res.status(201).json({user:safeUser(u),token:tokenFor(u)});
}));
