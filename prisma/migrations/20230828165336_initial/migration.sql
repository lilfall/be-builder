-- CreateTable
CREATE TABLE `Product` (
    `product_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(191) NULL,
    `description` VARCHAR(255) NULL,
    `price` FLOAT NOT NULL,
    `stock` INTEGER NOT NULL,
    `extra_data` JSON NULL,
    `category` VARCHAR(255) NULL,
    `weight` FLOAT NULL,
    `dimensions` VARCHAR(255) NULL,
    `store_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,
    `rating` FLOAT NULL,
    `minStock` INTEGER NULL,
    `promoPrice` FLOAT NULL,
    `discountPercentage` INTEGER NULL,
    `expireDate` DATETIME NULL,
    `location` VARCHAR(255) NULL,

    UNIQUE INDEX `Product_slug_key`(`slug`),
    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,
    `product_id` INTEGER NOT NULL,

    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `review_id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `rating` FLOAT NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `product_id` INTEGER NOT NULL,

    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NULL,
    `fullName` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `phoneNumber` VARCHAR(255) NULL,
    `additionalData` JSON NULL,
    `dateOfBirth` DATETIME(3) NULL,
    `gender` VARCHAR(191) NULL,
    `profileImage` VARCHAR(191) NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `facebook` VARCHAR(191) NULL,
    `twitter` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `linkedin` VARCHAR(191) NULL,
    `occupation` VARCHAR(191) NULL,
    `education` VARCHAR(191) NULL,
    `interests` VARCHAR(191) NULL,
    `receiveEmails` BOOLEAN NOT NULL DEFAULT true,
    `receiveSMS` BOOLEAN NOT NULL DEFAULT true,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `isSuperAdmin` BOOLEAN NOT NULL DEFAULT false,
    `verificationCode` VARCHAR(191) NULL,
    `resetToken` VARCHAR(191) NULL,
    `resetTokenExpiry` DATETIME(3) NULL,
    `defaultShippingAddress` VARCHAR(191) NULL,
    `defaultBillingAddress` VARCHAR(191) NULL,
    `defaultPaymentMethod` VARCHAR(191) NULL,
    `referralCode` VARCHAR(191) NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Store` (
    `store_id` VARCHAR(191) NOT NULL,
    `store_name` VARCHAR(255) NOT NULL,
    `store_setting` JSON NULL,
    `store_location` JSON NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`store_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_code` VARCHAR(191) NOT NULL,
    `amount` FLOAT NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `paymentMethod` VARCHAR(255) NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Transaction_transaction_code_key`(`transaction_code`),
    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plan` (
    `plan_id` INTEGER NOT NULL AUTO_INCREMENT,
    `plan_name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `price` FLOAT NOT NULL,
    `duration` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,

    PRIMARY KEY (`plan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscription` (
    `subscription_id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `end_date` DATETIME NULL,
    `status` VARCHAR(255) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `plan_id` INTEGER NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,

    UNIQUE INDEX `Subscription_user_id_key`(`user_id`),
    UNIQUE INDEX `Subscription_plan_id_key`(`plan_id`),
    PRIMARY KEY (`subscription_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`store_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `Plan`(`plan_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
