import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection.js';
import User from './User.js';

export interface CourseAttributes {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  instructorId: number;
  price: number;
  originalPrice: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseCreationAttributes extends Optional<CourseAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Course
  extends Model<CourseAttributes, CourseCreationAttributes>
  implements CourseAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public thumbnail!: string;
  public category!: string;
  public instructorId!: number;
  public price!: number;
  public originalPrice!: number;
  public duration!: string;
  public level!: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  public isPublished!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING(255),
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    instructorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    originalPrice: {
      type: DataTypes.DECIMAL(10, 2),
    },
    duration: {
      type: DataTypes.STRING(50),
    },
    level: {
      type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced', 'All Levels'),
      defaultValue: 'Beginner',
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'courses',
    timestamps: true,
  }
);

Course.belongsTo(User, { foreignKey: 'instructorId', as: 'instructor' });

export default Course;
