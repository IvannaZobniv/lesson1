import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';
import { CreateBuyerDto } from '../buyer/dto/createBuyer.dto';
import { BuyerService } from '../buyer/buyer.service';
import UpdateCarDto from '../car/updateCar.dto';
import { UpdateBuyerDto } from '../buyer/dto/updateBuyer.dto';
import CreateCarDto from '../car/createCar.dto';
import { MulterFile } from '../common/interface/MulterFile';
import {
  editFileName,
  imageFileFilter,
} from '../common/file-upload/file.upload';
import { Period } from '../common/enum/views-period';
import { Admin, Buyer, Car, Manager, Seller } from '@prisma/client';
import { buildPath } from '../common/helpers/helper';
import { UpdateManagerDto } from '../manager/dto/updateManager.dto';
import { CreateManagerDto } from '../manager/dto/createManager.dto';
import { ManagerService } from '../manager/manager.service';
import { SellerPremiumService } from '../seller-premium/seller-premium.service';
import UpdateSellerDto from '../seller/dto/updateSeller.dto';
import CreateSellerDto from '../seller/dto/createSeller.dto';
import { SellerService } from '../seller/seller.service';
import { S3Service } from '../s3/s3.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    @Inject(forwardRef(() => BuyerService))
    private readonly buyerService: BuyerService,
    @Inject(forwardRef(() => ManagerService))
    private readonly managerService: ManagerService,
    @Inject(forwardRef(() => SellerService))
    private readonly sellerService: SellerService,
    @Inject(forwardRef(() => SellerPremiumService))
    private readonly sellerPremiumService: SellerPremiumService,
    @Inject(forwardRef(() => S3Service))
    private readonly s3Service: S3Service,
  ) {}
  //---------------------------
  @ApiOperation({ summary: 'Create a new admin' })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createAdmin(
    @Req() req: Request,
    @Res() res: any,
    @Body() adminData: CreateAdminDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Admin> {
    if (file) {
      const filePath = buildPath(file.filename, 'admin');
      await this.s3Service.uploadPhoto(file, filePath);
      adminData.avatar = filePath;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.adminService.createAdmin(adminData));
  }

  @ApiOperation({ summary: 'Update admin' })
  @Patch('/:idAdmin')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateAdmin(
    @Param('idAdmin') idAdmin: string,
    @Body() adminData: UpdateAdminDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Admin> {
    if (file) {
      const filePath = buildPath(file.filename, 'admin');
      await this.s3Service.uploadPhoto(file, filePath);
      adminData.avatar = filePath;
    }
    return this.adminService.updateAdmin(idAdmin, adminData);
  }

  @ApiOperation({ summary: 'Get admin by ID' })
  @ApiParam({ name: 'idAdmin', type: 'string', description: 'Admin ID' })
  @Get('/:idAdmin')
  async getAdminById(
    @Req() req: any,
    @Res() res: any,
    @Param('idAdmin') idAdmin: string,
  ): Promise<Admin> {
    return res
      .status(HttpStatus.OK)
      .json(await this.adminService.getAdminById(idAdmin));
  }

  @ApiOperation({ summary: 'Get admin by name' })
  @ApiParam({ name: 'firstName', required: true })
  @Get('/:firstName')
  async getAdminByFirstName(
    @Req() req: Request,
    @Res() res: any,
    @Param('firstName') firstName: string,
  ): Promise<Admin> {
    try {
      const admin = await this.adminService.getAdminByName(firstName);
      return res.status(HttpStatus.OK).json(admin);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiOperation({ summary: 'Get a list of admins' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get()
  async getAdminsList(@Req() reg: Request, @Res() res: any): Promise<Admin[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.adminService.getAdminList());
  }

  @ApiOperation({ summary: 'Remove admin' })
  @ApiParam({ name: 'idAdmin', required: true })
  @Delete('/:idAdmin')
  async deleteAdmin(
    @Param('idAdmin') idAdmin: string,
    @Res() res: any,
  ): Promise<void> {
    await this.adminService.deleteAdmin(idAdmin);
    res.sendStatus(HttpStatus.OK);
  }

  //-------------------
  @ApiOperation({ summary: 'Create a new vehicle as an admin' })
  @ApiCreatedResponse({ type: CreateCarDto })
  @Post('/new/:idSeller/car')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 8 }], {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const filePath = buildPath(file.originalname, 'cars');
          cb(null, filePath);
        },
      }),
    }),
  )
  async createCar(
    @Req() req: Request,
    @Param('idSeller') idSeller: string,
    @Body() carData: CreateCarDto,
    @Res() res: any,
    @UploadedFile() files: { image?: MulterFile[] },
  ): Promise<CreateCarDto> {
    if (files?.image) {
      const uploadedFile = files.image[0];
      const filePath = buildPath(uploadedFile.originalname, 'cars');
      await this.s3Service.uploadPhoto(uploadedFile, 'cars');
      carData.image = filePath;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.sellerService.createCar(idSeller, carData));
  }

  @ApiOperation({ summary: 'The admin will create another car for the seller' })
  @ApiCreatedResponse({ type: CreateCarDto })
  @Post('/another/:idSeller/car')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 8 }], {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const filePath = buildPath(file.originalname, 'cars');
          cb(null, filePath);
        },
      }),
    }),
  )
  async createAnotherCar(
    @Req() req: Request,
    @Param('idSeller') idSeller: string,
    @Body() carData: CreateCarDto,
    @Res() res: any,
    @UploadedFile() files: { image?: MulterFile[] },
  ): Promise<CreateCarDto> {
    if (files?.image) {
      const uploadedFile = files.image[0];
      const filePath = buildPath(uploadedFile.originalname, 'cars');
      await this.s3Service.uploadPhoto(uploadedFile, 'cars');
      carData.image = filePath;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(
        await this.sellerPremiumService.createCarBySellerPremium(
          idSeller,
          carData,
        ),
      );
  }

  @ApiOperation({ summary: 'Auto update from the admin' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @Patch('/update/seller/:idSeller/car/:idCar')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 8 }], {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const filePath = buildPath(file.originalname, 'cars');
          cb(null, filePath);
        },
      }),
    }),
  )
  async updateCar(
    @Param('idSeller') idSeller: string,
    @Param('idCar') idCar: string,
    @Body() carData: UpdateCarDto,
    @UploadedFile() files: { image?: MulterFile[] },
  ): Promise<CreateCarDto> {
    if (files?.image) {
      const uploadedFile = files.image[0];
      const filePath = buildPath(uploadedFile.originalname, 'cars');
      await this.s3Service.uploadPhoto(uploadedFile, 'cars');
      carData.image = filePath;
    }
    return this.sellerService.updateCar(idSeller, idCar, carData);
  }

  @ApiOperation({ summary: 'Get all cars by admin' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @Get('/cars/all')
  async getAllCars(@Req() req: Request, @Res() res: any): Promise<Car[]> {
    return res.status(HttpStatus.OK).json(await this.adminService.getCars());
  }
}
