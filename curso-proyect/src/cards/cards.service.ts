import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  async getAllCards(): Promise<Card[]> {
    return this.cardRepository.find({relations: ['userId']});
  }
  
  async createCard(createCardDto: CreateCardDto): Promise<Card> {
    const card = this.cardRepository.create(createCardDto);
    return this.cardRepository.save(card);
  }

  
  async getCard(id: number): Promise<Card> {
    const card = await this.cardRepository.findOne({ where: { id }, relations: ['userId'] });
    if (!card) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }
    return card;
  }

  async updateCard(id: number, updateCardDto: UpdateCardDto): Promise<Card> {
    const card = await this.getCard(id);
    this.cardRepository.merge(card, updateCardDto);
    return this.cardRepository.save(card);
  }

  async deleteCard(id: number): Promise<void> {
    const card = await this.getCard(id);
    if (!card) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }
    await this.cardRepository.remove(card);
  }
}
