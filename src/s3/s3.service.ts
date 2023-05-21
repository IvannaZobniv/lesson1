import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

import { configs } from '../common/config/config';
import { MulterFile } from '../common/interface/MulterFile';

@Injectable()
export class S3Service {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: configs.AWS_S3_BUCKET_REGION,
      credentials: {
        accessKeyId: configs.AWS_S3_ACCESS_KEY,
        secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadPhoto(file: MulterFile, itemType: string): Promise<string> {
    const filePath = this.buildPath(file.originalname, itemType);

    await this.client.send(
      new PutObjectCommand({
        Bucket: configs.AWS_S3_BUCKET_NAME,
        Key: filePath,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: configs.AWS_S3_BUCKET_ACL,
      }),
    );

    return filePath;
  }

  async deletePhoto(filePath: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: configs.AWS_S3_BUCKET_NAME,
        Key: filePath,
      }),
    );
  }

  private buildPath(fileName: string, itemType: string): string {
    const fileExtension = extname(fileName);
    const uniqueId = uuidv4();

    return `${itemType}/${uniqueId}${fileExtension}`;
  }
}
