import mongoose from 'mongoose';
const {Schema,model}=mongoose;
export const Contact=model('Contact',new Schema({firstname:{type:String,required:true},lastname:{type:String,required:true},email:{type:String,required:true}}));
const itemFields={title:{type:String,required:true},firstname:{type:String,required:true},lastname:{type:String,required:true},email:{type:String,required:true},completion:{type:Date,required:true},description:{type:String,required:true}};
export const Project=model('Project',new Schema(itemFields));
export const Qualification=model('Qualification',new Schema(itemFields));
export const User=model('User',new Schema({name:{type:String,required:true},email:{type:String,required:true,unique:true,lowercase:true,trim:true},password:{type:String,required:true,select:false},created:{type:Date,default:Date.now},updated:{type:Date,default:Date.now}}));
