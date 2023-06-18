/*
  Warnings:

  - You are about to alter the column `startTime` on the `event` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endTime` on the `event` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startTime` on the `host` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endTime` on the `host` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `startTime` on the `transport` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endTime` on the `transport` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `event` MODIFY `startTime` DATETIME NOT NULL,
    MODIFY `endTime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `host` MODIFY `startTime` DATETIME NOT NULL,
    MODIFY `endTime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `transport` MODIFY `startTime` DATETIME NOT NULL,
    MODIFY `endTime` DATETIME NOT NULL;
