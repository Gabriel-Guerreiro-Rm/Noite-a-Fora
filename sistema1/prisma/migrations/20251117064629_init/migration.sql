-- CreateTable
CREATE TABLE "Organizer" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "organizerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketLot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TicketLot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_email_key" ON "Organizer"("email");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketLot" ADD CONSTRAINT "TicketLot_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
