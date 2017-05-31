import Sequelize from 'sequelize'
import connString from 'rds-connection-string'
import Token from './Token'

const sequelize = new Sequelize(
  connString({scheme: 'mysql'}) || process.env.DATABASE_URL
)

const imports = [
  Token,
]

const models = {}

imports.forEach((importFn) => {
  const model = importFn(sequelize, Sequelize)
  models[model.name] = model
})

Object.keys(models).forEach((name) => {
  if ('associate' in models[name]) {
    models[name].associate(models)
  }
})

module.exports = {
  sequelize,
  ...models,
}
