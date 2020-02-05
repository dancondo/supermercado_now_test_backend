import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class AnimesService {

  private url = process.env.ANIMES_URL

  async search(query: string): Promise<any> {
    const res = await fetch(`${this.url}?q=${query}&limit=10`);
    const resData = await res.json();
    return resData.results;
  } 

}
