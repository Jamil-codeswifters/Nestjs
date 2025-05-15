import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { Blog } from 'src/blog/blog.entity';
@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Blog)
  blogs: Blog[];
}
