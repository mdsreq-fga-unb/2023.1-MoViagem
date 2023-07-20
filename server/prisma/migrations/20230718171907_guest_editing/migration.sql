/*
  Warnings:

  - You are about to alter the column `eventTime` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startTime` on the `Host` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endTime` on the `Host` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startTime` on the `Transport` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endTime` on the `Transport` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Event` MODIFY `eventTime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Guests` ADD COLUMN `canEdit` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Host` MODIFY `startTime` DATETIME NOT NULL,
    MODIFY `endTime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Transport` MODIFY `startTime` DATETIME NOT NULL,
    MODIFY `endTime` DATETIME NOT NULL;
