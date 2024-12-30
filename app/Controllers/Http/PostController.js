
'use strict';
const Post = use('App/Models/Post');
const Joi = require('joi');

class PostController {
  async create({ request, response }) {
    // get data from req,save in tht db,return newly created post
    const id = request.input('id');
    const title = request.input('title');
    const description = request.input('description');
    const status = request.input('status');
    const due_date = request.input('due_date');

    const schema = Joi.object().keys({
      id: Joi.number(),
      title: Joi.string().required().max(20),
      description: Joi.string().required(),
      status: Joi.string().optional(),
      due_date: Joi.date(),
    });
    const value = await schema.validateAsync(request.all());

    const post = new Post();

    post.id = id;
    post.title = title;
    post.description = description;
    post.status = status;
    post.due_date = due_date;

    await post.save();

    return post;
  }

  // get
  async findAll({ request, response }) {
    // const posts=await Post.query().fetch();
    const posts = await Post.all();
    return posts;
  }
  async findOne({ request, response, params }) {
    const post = await Post.find(params.id);
    return post;
  }
  async update({ request, response, params }) {
    // get all params,define schema,validate schema,find the post,update or save ,return updated post in the response
    const id = request.input('id');
    const title = request.input('title');
    const description = request.input('description');
    const status = request.input('status');

    const schema = Joi.object().keys({
      id: Joi.number(),
      title: Joi.string().optional().max(20),
      description: Joi.string().optional(),
      status: Joi.string().optional(),
      due_date: Joi.date(),
    });
    console.log('request.all()=', request.all());
    // const {value,error}= Joi.validate(request.all(),schema);
    const value = await schema.validateAsync(request.all());

    const post = await Post.find(params.id);
    if (id) {
      post.id = id;
    }
    if (title) {
      post.title = title;
    }
    if (description) {
      post.description = description;
    }
    await post.save();
    return post;
  }
  async delete({ request, response, params }) {
    const post = await Post.find(params.id);
    await post.delete();
    return post;
  }
}
module.exports = PostController;


