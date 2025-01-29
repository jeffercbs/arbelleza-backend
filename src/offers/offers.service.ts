import { Injectable } from '@nestjs/common';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OffersService {
  constructor() {}
  // async create(createOfferDto: CreateOfferDto) {
  //   try {
  //     const newOffer = await this.offersRepository.create(createOfferDto);
  //     this.offersRepository.save(newOffer);
  //     return { message: 'Offer created successfully', now: new Date() };
  //   } catch (error) {
  //     throw new ServiceUnavailableException({ message: 'Error creating offer' });
  //   }
  // }

  // async findAll() {
  //   try {
  //     const offers = await this.offersRepository.find({});

  //     if (offers.length === 0) {
  //       return { message: 'No offers found' };
  //     }

  //     return offers;
  //   } catch (error) {
  //     throw new ServiceUnavailableException({ message: 'Error fetching offers' });
  //   }
  // }

  // async findOne(id: string) {
  //   try {
  //     const offer = await this.offersRepository.findOne({
  //       where: {
  //         id
  //       },
  //     })
  //   } catch (error) {

  //   }
  // }

  update(id: string, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  remove(id: string) {
    return `This action removes a #${id} offer`;
  }
}
