// when user checks in
// check if user has checked in already
// if user has checked in, return error message
//
// scheduled job: every day, at 4am, remove all past check-ins
//

export const validateParams = (req, res, next) => {
  if (!req.body.username) {
    res.json({error: 'Missing username'})
  } else if (!req.body.business) {
    res.json({error: 'Missing business ID'})
  } else {
    next()
  }
}

export const isNotCheckedIn = (req, res, next) => {
  CheckIn
    .find({
      where: {
        username: req.user.username,
        business: req.body.business,
      },
    })
    .then((checkin) => {
      if (!!checkin) {
        return res.json({
          error: 'Already checked in'
        })
      }
      next()
    })
    .catch(next)
}

export const postCheckIn = (req, res, next) => {
  CheckIn
    .create({
      username: req.user.username,
      business: req.body.business,
    })
    .then((checkin) => {
      res.json(checkin.get({plain: true}))
    })
    .catch(next)
}
