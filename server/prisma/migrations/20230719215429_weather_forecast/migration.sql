-- CreateTable
CREATE TABLE `WeatherForecast` (
    `travelId` INTEGER UNSIGNED NOT NULL,
    `date` DATE NOT NULL,
    `minTemp` DOUBLE NOT NULL,
    `maxTemp` DOUBLE NOT NULL,
    `humidity` DOUBLE NOT NULL,
    `windSpeed` DOUBLE NOT NULL,
    `rainProb` DOUBLE NOT NULL,
    `snowProb` DOUBLE NOT NULL,
    `weatherType` ENUM('Thunderstorm', 'Drizzle', 'Rain', 'Snow', 'Atmosphere', 'Clear', 'Clouds') NOT NULL,
    `weatherDesc` VARCHAR(50) NOT NULL,
    `weatherIcon` VARCHAR(10) NOT NULL,
    `alert` TEXT NULL,

    PRIMARY KEY (`travelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WeatherForecast` ADD CONSTRAINT `WeatherForecast_travelId_fkey` FOREIGN KEY (`travelId`) REFERENCES `Travel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
