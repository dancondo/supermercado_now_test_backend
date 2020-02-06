import { Injectable, Req, Res } from '@nestjs/common';
import * as fs from 'fs';
import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';


@Injectable()
export class ImageUploadService {
  public AWS_S3_BUCKET_NAME: string = process.env.AWS_S3_BUCKET_NAME;
  public s3: AWS.S3 = new AWS.S3();

  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
  }

  public async upload(file): Promise<string> {
    const key = file.originalname;
    const upload = await this.s3.upload({ Bucket: this.AWS_S3_BUCKET_NAME, Body: file.buffer, Key: key, ACL: 'public-read' })
    const data = await upload.promise();
    console.log('DATA', data);
    return data.Location;
  }
}