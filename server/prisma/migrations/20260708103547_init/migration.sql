-- CreateTable
CREATE TABLE "WorkoutSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "durationInSeconds" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "intensity" INTEGER
);
