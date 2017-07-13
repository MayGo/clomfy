/* tslint:disable:variable-name */

import * as SequelizeStatic from "sequelize";
import { DataTypes, Sequelize } from "sequelize";
import { AppSettingAttributes, AppSettingInstance } from "./interfaces/app-setting-interface";

export default function (sequelize: Sequelize):
  SequelizeStatic.Model<AppSettingInstance, AppSettingAttributes> {
  let AppSetting = sequelize.define<AppSettingInstance, AppSettingAttributes>('AppSetting', {
    name: SequelizeStatic.STRING,
    color: SequelizeStatic.STRING
  }, { timestamps: false });

  return AppSetting;
}

