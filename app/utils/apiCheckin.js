import request from 'superagent'

export const checkin = (id) => {
  console.log(id)
  return request
    .post('/api/checkin')
    .send({ business: id })
}

export const unCheckin = (id) => {
  return request
    .delete('/api/checkin')
    .send({ business: id })
}
