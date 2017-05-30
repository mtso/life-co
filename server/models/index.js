import { default as Sequelize } from 'sequelize'
import connString from 'rds-connection-string'

export const sequelize = new Sequelize(
  connString({scheme: 'mysql'}) || process.env.DATABASE_URL
)
