import {
  Column,
  Model,
  PrimaryKey,
  Table,
  DataType,
  Sequelize,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV1 })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  })
  email: string;

  @Column({ allowNull: false })
  password: boolean;
}
