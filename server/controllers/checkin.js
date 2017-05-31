// Note:
//
// when user checks in
// check if user has checked in already
// if user has checked in, return error message
//
// scheduled job: every day, at 4am, remove all past check-ins

//
// Helper
//

const calculateCutoff = (date) => {
  if (typeof date !== 'object') {
    date = new Date()
  }
  const cutoffMs = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  return new Date(cutoffMs)
}

//
// Middlewares
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
  const lastNight = calculateCutoff(new Date())
  CheckIn
    .findOne({
      where: {
        username: req.user.username,
        business: req.body.business,
        createdAt: { gte: lastNight },
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

export const isCheckedIn = (req, res, next) => {
  const lastNight = calculateCutoff(new Date())
  CheckIn
    .findOne({
      where: {
        username: req.user.username,
        business: req.body.business,
        createdAt: { gte: lastNight },
      },
    })
    .then((checkin) => {
      if (!checkin) {
        return res.json({
          error: 'Is not checked in'
        })
      }
      next()
    })
    .catch(next)
}

//
// Endpoints
//

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

export const cancelCheckIn = (req, res, next) => {
  const lastNight = calculateCutoff(new Date())
  CheckIn
    .delete({
      where: {
        username: req.user.username,
        business: req.body.business,
        createdAt: { gte: lastNight },
      },
    })
    .then((success) => {
      if (!success) {
        // error
        return
      }
      res.json({
        message: 'Successfully canceled checkin'
      })
    })
    .catch(next)
}
