import Sequelize from 'sequelize'
import connString from 'rds-connection-string'

const sequelize = new Sequelize(
  connString({scheme: 'mysql'}) || process.env.DATABASE_URL
)

const inits = [
  require('./Token'),
]

const models = {}
models.sequelize = sequelize

inits.forEach((init) => {
  const model = init(sequelize, Sequelize)
  models[model.name] = model
})

Object.keys(models).forEach((name) => {
  if ('associate' in models[name]) {
    models[name].associate(models)
  }
})

export default models
