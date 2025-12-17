import { UnavailabilityError } from 'expo-modules-core';

import NotificationChannelManager from './NotificationChannelManager';
import {
  NotificationChannelInput,
  NotificationChannel,
  AndroidImportance,
} from './NotificationChannelManager.types';

export default async function setNotificationChannelAsync(
  channelId: string,
  channel: NotificationChannelInput
): Promise<NotificationChannel | null> {
  if (!NotificationChannelManager.setNotificationChannelAsync) {
    throw new UnavailabilityError('Notifications', 'setNotificationChannelAsync');
  }

  if (channel?.importance === AndroidImportance.UNSPECIFIED) {
    console.warn(
      `Warning: You are setting the importance of the notification channel "${channelId}" to "UNSPECIFIED". ` +
        `This may lead to errors on some Android versions. ` +
        `Consider using AndroidImportance.DEFAULT instead.`
    );
  }
  return await NotificationChannelManager.setNotificationChannelAsync(channelId, channel);
}
