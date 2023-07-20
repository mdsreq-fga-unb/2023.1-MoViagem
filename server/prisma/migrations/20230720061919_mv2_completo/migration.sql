-- AlterTable
ALTER TABLE `Guests` ADD COLUMN `canEdit` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Travel` ADD COLUMN `Atmosphere` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `Clear` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `Clouds` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `Drizzle` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `Rain` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `Snow` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `Thunderstorm` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `latitude` DOUBLE NULL,
    ADD COLUMN `longitude` DOUBLE NULL;

-- CreateTable
CREATE TABLE `EventGuests` (
    `userId` INTEGER UNSIGNED NOT NULL,
    `eventId` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`userId`, `eventId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WeatherForecast` (
    `travelId` INTEGER UNSIGNED NOT NULL,
    `date` DATE NOT NULL,
    `minTemp` DOUBLE NOT NULL,
    `maxTemp` DOUBLE NOT NULL,
    `humidity` DOUBLE NOT NULL,
    `windSpeed` DOUBLE NOT NULL,
    `rainProb` DOUBLE NOT NULL,
    `weatherType` ENUM('Thunderstorm', 'Drizzle', 'Rain', 'Snow', 'Atmosphere', 'Clear', 'Clouds') NOT NULL,
    `weatherDesc` VARCHAR(50) NOT NULL,
    `weatherIcon` VARCHAR(10) NOT NULL,
    `alert` TEXT NULL,

    PRIMARY KEY (`travelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EventGuests` ADD CONSTRAINT `EventGuests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventGuests` ADD CONSTRAINT `EventGuests_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WeatherForecast` ADD CONSTRAINT `WeatherForecast_travelId_fkey` FOREIGN KEY (`travelId`) REFERENCES `Travel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
