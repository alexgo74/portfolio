var projects = [];

function Project (options) {
/* This is my Model constructor. It will take in
   my source data from blogProjects and instantiate a
   new Object according to this new definition. options is
   a placeholder for the object that will ultimately be
   passed in. */
  this.title = options.title;
  this.category = options.category;
  this.team = options.team;
  this.projectUrl = options.projectUrl;
  this.workedOn = options.workedOn;
  this.body = options.body;
};

Project.prototype.toHtml = function() {
  var $newProject = $('project.template').clone();
  $newProject.attr('data-category', this.category);
  $newProject.find('h1').text(this.title);
  $newProject.find('a').text(this.team);
  $newProject.find('a').attr('href', this.projectUrl);
  $newProject.find('section.article-body').html(this.body);
  $newProject.find('time[pubdate]').attr('title', this.workedOn);
  $newProject.find('time').text('about ' + parseInt((new Date() - new Date(this.workedOn))/60/60/24/1000) + ' days ago');
  $newProject.removeClass('template');
  return $newProject;
};

/* This sort method is a standard JavaScript Array function
   that will iterate over an array and compare its values,
   and then arrange them in ascending or descending order
   according to the return value. We are comparing the
   workedOn properties to arrange the blog posts in
   descending order (most recent first). */
blogProjects.sort(function(currentObject, nextObject) {
  return (new Date(nextObject.workedOn)) - (new Date(currentObject.workedOn));
});

blogProjects.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(article) {
  $('#articles').append(project.toHtml());
});
