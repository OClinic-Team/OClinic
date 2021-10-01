class AddScheduleController {
    
    //[GET] addschedule/create
  create(req, res, next) {
    res.render('addschedule/create');
  }
}

module.exports = new AddScheduleController;