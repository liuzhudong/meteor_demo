Pictures = new Mongo.Collection("pictures");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);


var postsData = [
  {
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  }, 
  {
    title: 'Meteor',
    url: 'http://meteor.com'
  }, 
  {
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com'
  }
];

  Template.postsList.helpers({
    posts:postsData 
  });
  Template.imgLists.helpers({
    imgs:function(){
      return Pictures.find({},{sort:{createdAt:-1}});
    }
  });

  Template.body.events({
    "click .get-img button":function(){
      MeteorCamera.getPicture({},function(e,r){
        if(e){
          alert(e.message);
        }else{
          Pictures.insert({
            img:r,
            createdAt: new Date() // current time
          });
        }
      });
    }
    
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
