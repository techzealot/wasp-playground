-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "desceription" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false
);
