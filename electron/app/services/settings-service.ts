import { TrackItemInstance } from '../models/interfaces/track-item-interface';
import { trackItemService } from './track-item-service';
import { logManager } from "../log-manager";

import { models, sequelize } from "../models/index";
import { SettingsAttributes, SettingsInstance } from "../models/interfaces/settings-interface";
import { Transaction } from "sequelize";

export class SettingsService {
  logger = logManager.getLogger('SettingsService');

  async findByName(name: string) {
    let items = await models.Settings.findOrCreate({
      where: {
        name: name
      }
    });
    let item = items[0];
    item.jsonDataParsed = JSON.parse(item.jsonData);
    return item;
  }

  updateByName(name: string, jsonData: any) {

    return models.Settings.update({ jsonData: JSON.stringify(jsonData) }, {
      where: {
        name: name
      }
    });
  }

  async fetchWorkSettings() {
    let item = await this.findByName('WORK_SETTINGS');
    return item.jsonDataParsed;
  }

  async fetchAnalyserSettings() {
    let item = await this.findByName('ANALYSER_SETTINGS');
    return item.jsonDataParsed;
  }

  async getRunningLogItem() {
    let settingsItem = await this.findByName('RUNNING_LOG_ITEM');
    //console.log("got RUNNING_LOG_ITEM: ", item);
    if (settingsItem.jsonDataParsed.id) {
      let logItem = await models.TrackItem.findById(settingsItem.jsonDataParsed.id);
      return logItem;
    }
    return null;
  }

  saveRunningLogItemReference(logItemId) {
    this.updateByName('RUNNING_LOG_ITEM', { id: logItemId }).then((item) => {
      console.log("Updated RUNNING_LOG_ITEM!", logItemId);
    });

  }
}

export const settingsService = new SettingsService();
