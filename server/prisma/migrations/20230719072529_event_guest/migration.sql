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
