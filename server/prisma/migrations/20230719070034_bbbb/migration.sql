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
ALTER TABLE `Host` MODIFY `startTime` DATETIME NOT NULL,
    MODIFY `endTime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Transport` MODIFY `startTime` DATETIME NOT NULL,
    MODIFY `endTime` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `EventGuests` (
    `userId` INTEGER UNSIGNED NOT NULL,
    `eventId` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`userId`, `eventId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EventGuests` ADD CONSTRAINT `EventGuests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventGuests` ADD CONSTRAINT `EventGuests_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
