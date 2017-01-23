var projects = [];

function Project (options) {
  /*
    This is our Model constructor. It will take in
    our source data from blogProjects and instantiate a
    new Object according to this new definition. options is
    a placeholder for the object that will ultimately be
    passed in. Use all of the properties in blogProjects
    to populate the new Project data that we'll use.
  */
  this.title = options.title;
  this.category = options.category;
  this.author = options.author;
  this.authorUrl = options.authorUrl;
  this.publishedOn = options.publishedOn;
  this.body = options.body;
}

Project.prototype.toHtml = function() {
  var $newProject = $('project.template').clone();

  $newProject.attr('data-category', this.category);
  $newProject.find('h1').text(this.title);
  $newProject.find('a').text(this.author);
  $newProject.find('a').attr('href', this.authorUrl);
  $newProject.find('section.project-body').html(this.body);
  $newProject.find('time[pubdate]').attr('title', this.publishedOn);
  $newProject.find('time').text('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

  $newProject.removeClass('template');
  return $newProject;
};
/*
  This sort method is a standard JavaScript Array function
  that will iterate over an array and compare its values,
  and then arrange them in ascending or descending order
  according to the return value. We are comparing the
  publishedOn properties to arrange the blog posts in
  descending order (most recent first).
*/
myProjects.sort(function(currentObject, nextObject) {
  return (new Date(nextObject.publishedOn)) - (new Date(currentObject.publishedOn));
});

myProjects.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(project) {
  $('#projects').append(project.toHtml());
});
