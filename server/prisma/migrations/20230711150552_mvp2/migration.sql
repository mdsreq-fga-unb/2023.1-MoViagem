/*
 Warnings:
 
 - You are about to alter the column `eventTime` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
 - You are about to alter the column `startTime` on the `Host` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
 - You are about to alter the column `endTime` on the `Host` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
 - You are about to alter the column `startTime` on the `Transport` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
 - You are about to alter the column `endTime` on the `Transport` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
 - A unique constraint covering the columns `[travelId]` on the table `Host` will be added. If there are existing duplicate values, this will fail.
 - A unique constraint covering the columns `[travelId]` on the table `Transport` will be added. If there are existing duplicate values, this will fail.
 
 */
-- AlterTable
ALTER TABLE `Event`
MODIFY `eventTime` DATETIME NOT NULL;
-- AlterTable
ALTER TABLE `Host`
MODIFY `startTime` DATETIME NOT NULL,
    MODIFY `endTime` DATETIME NOT NULL;
-- AlterTable
ALTER TABLE `Transport`
MODIFY `startTime` DATETIME NOT NULL,
    MODIFY `endTime` DATETIME NOT NULL;
-- CreateTable
CREATE TABLE `Guests` (
    `userId` INTEGER UNSIGNED NOT NULL,
    `travelId` INTEGER UNSIGNED NOT NULL,
    PRIMARY KEY (`userId`, `travelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateIndex
CREATE UNIQUE INDEX `Host_travelId_key` ON `Host`(`travelId`);
-- CreateIndex
CREATE UNIQUE INDEX `Transport_travelId_key` ON `Transport`(`travelId`);
-- AddForeignKey
ALTER TABLE `Guests`
ADD CONSTRAINT `Guests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `Guests`
ADD CONSTRAINT `Guests_travelId_fkey` FOREIGN KEY (`travelId`) REFERENCES `Travel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;