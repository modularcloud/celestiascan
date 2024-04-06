CREATE TABLE `local_chains` (
	`id` integer NOT NULL,
	`brand` text NOT NULL,
	`chainName` text NOT NULL,
	`config` text NOT NULL,
	`paidVersion` integer NOT NULL,
	`accountId` text NOT NULL,
	`integrationId` text NOT NULL,
	`namespace` text,
	`daLayer` text,
	`startHeight` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `local_chains_brand_unique` ON `local_chains` (`brand`);