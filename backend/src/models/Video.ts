import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection.js';
import Course from './Course.js';

export interface VideoAttributes {
  id: number;
  courseId: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail?: string;
  duration: number; // in seconds
  order: number; // lesson order
  isPublished: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoCreationAttributes
  extends Optional<VideoAttributes, 'id' | 'createdAt' | 'updatedAt' | 'views'> {}

class Video
  extends Model<VideoAttributes, VideoCreationAttributes>
  implements VideoAttributes
{
  public id!: number;
  public courseId!: number;
  public title!: string;
  public description!: string;
  public videoUrl!: string;
  public thumbnail?: string;
  public duration!: number;
  public order!: number;
  public isPublished!: boolean;
  public views!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Video.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Course,
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    videoUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING(255),
    },
    duration: {
      type: DataTypes.INTEGER, // seconds
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    tableName: 'videos',
    timestamps: true,
  }
);

Video.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });
Course.hasMany(Video, { foreignKey: 'courseId', as: 'videos' });

export default Video;
