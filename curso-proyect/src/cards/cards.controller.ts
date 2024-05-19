import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, NotFoundException, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Response } from 'express';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  async getAllCards(@Res() response: Response) {
    const cards = await this.cardsService.getAllCards();
    return response.json(cards);
  }

  @Get('/:id')
  async getCard(@Param('id') id: string, @Res() response: Response) {
    try {
      const card = await this.cardsService.getCard(Number(id));
      return response.json(card);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  async createCard(@Body() createCardDto: CreateCardDto, @Res() response: Response) {
    try {
      const newCard = await this.cardsService.createCard(createCardDto);
      return response.json(newCard);
    } catch (error) {
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  async updateCard(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto, @Res() response: Response) {
    try {
      const updatedCard = await this.cardsService.updateCard(Number(id), updateCardDto);
      return response.json(updatedCard);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  @Delete('/:id')
  async deleteCard(@Param('id') id: string, @Res() response: Response) {
    try {
      await this.cardsService.deleteCard(Number(id));
      return response.status(204).send();
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
