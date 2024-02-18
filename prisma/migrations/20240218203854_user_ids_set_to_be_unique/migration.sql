/*
  Warnings:

  - A unique constraint covering the columns `[userIds]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Conversation_userIds_key" ON "Conversation"("userIds");
