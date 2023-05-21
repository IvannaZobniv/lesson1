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


  @ApiOperation({ summary: 'Create a new buyer as an admin' })
  @Post('/buyer')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createBuyer(
    @Req() req: Request,
    @Res() res: any,
    @Body() buyerData: CreateBuyerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateBuyerDto> {
    if (file) {
      const filePath = buildPath(file.filename, 'buyer');
      await this.s3Service.uploadPhoto(file, filePath);
      buyerData.avatar = filePath;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.buyerService.createBuyer(buyerData));
  }

  @ApiOperation({ summary: 'Update the buyer as an admin' })
  @Patch('/buyer/:idBuyer')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateBuyer(
    @Param('idBuyer') idBuyer: string,
    @Body() buyerData: UpdateBuyerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Buyer> {
    if (file) {
      const filePath = buildPath(file.filename, 'buyer');
      await this.s3Service.uploadPhoto(file, filePath);
      buyerData.avatar = filePath;
    }
    return this.buyerService.updateBuyer(idBuyer, buyerData);
  }

  @ApiOperation({ summary: 'Get the list of buyers by the admin' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get('/buyer/list')
  async getBuyerList(@Req() reg: any, @Res() res: any): Promise<Buyer[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.buyerService.getBuyerList());
  }

  @ApiOperation({ summary: 'Get the buyer by ID from the admin' })
  @ApiParam({ name: 'idBuyer', type: 'string', description: 'Buyer ID' })
  @Get('/buyer/:idBuyer')
  async getBuyerById(
    @Req() req: Request,
    @Res() res: any,
    @Param('idBuyer') idBuyer: string,
  ): Promise<Buyer> {
    return res
      .status(HttpStatus.OK)
      .json(await this.buyerService.getBuyerById(idBuyer));
  }

  @ApiOperation({ summary: 'Get the buyer by admin name' })
  @ApiParam({ name: 'firstName', required: true })
  @Get('/buyer/name/:firstName')
  async getBuyerByFirstName(
    @Req() req: Request,
    @Res() res: any,
    @Param('firstName') firstName: string,
  ): Promise<Buyer> {
    try {
      const buyer = await this.buyerService.getBuyerByFirstName(firstName);
      return res.status(HttpStatus.OK).json(buyer);
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

  @ApiOperation({ summary: 'Delete buyer by admin' })
  @ApiParam({ name: 'idBuyer', required: true })
  @Delete('/buyer/:idBuyer')
  async deleteBuyer(
    @Param('idBuyer') idBuyer: string,
    @Res() res: any,
  ): Promise<void> {
    await this.buyerService.deleteBuyer(idBuyer);
    res.sendStatus(HttpStatus.OK);
  }

  // ---------------------------
  @ApiOperation({ summary: 'Create a new manager as an admin' })
  @Post('/manager')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createManager(
    @Req() req: Request,
    @Res() res: any,
    @Body() managerData: CreateManagerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateManagerDto> {
    if (file) {
      const filePath = buildPath(file.filename, 'manager');
      await this.s3Service.uploadPhoto(file, filePath);
      managerData.avatar = filePath;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.managerService.createManager(managerData));
  }

  @ApiOperation({ summary: 'Update manager by admin' })
  @Patch('/manager/:idManager')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateManager(
    @Param('idManager') idManager: string,
    @Body() managerData: UpdateManagerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Manager> {
    if (file) {
      const filePath = buildPath(file.filename, 'manager');
      await this.s3Service.uploadPhoto(file, filePath);
      managerData.avatar = filePath;
    }
    return this.managerService.updateManager(idManager, managerData);
  }

  @ApiOperation({ summary: 'Get manager by ID from admin' })
  @ApiParam({ name: 'idmManager', type: 'string', description: 'Manager ID' })
  @Get('/manager/:idManager')
  async getManagerById(
    @Req() req: Request,
    @Res() res: any,
    @Param('idManager') idManager: string,
  ): Promise<Manager> {
    return res
      .status(HttpStatus.OK)
      .json(await this.managerService.getManagerById(idManager));
  }

  @ApiOperation({ summary: 'Get a manager named admin' })
  @ApiParam({ name: 'firstName', required: true })
  @Get('/manager/name/:firstName')
  async getManagerByName(
    @Req() req: Request,
    @Res() res: any,
    @Param('firstName') firstName: string,
  ): Promise<Manager> {
    try {
      const buyer = await this.managerService.getManagerByName(firstName);
      return res.status(HttpStatus.OK).json(buyer);
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

  @ApiOperation({ summary: 'Get a list of managers by admin' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get('/managers/list')
  async getManagerList(@Req() reg: any, @Res() res: any): Promise<Manager[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.managerService.getManagerList());
  }

  @ApiOperation({ summary: 'Delete the manager as an admin' })
  @ApiParam({ name: 'idManager', required: true })
  @Delete('/manager/:idManager')
  async deleteManager(
    @Param('idManager') idManager: string,
    @Res() res: any,
  ): Promise<void> {
    await this.managerService.deleteManager(idManager);
    res.sendStatus(HttpStatus.OK);
  }

  // ----------------------------------
  @ApiOperation({ summary: 'Create a new seller as an admin' })
  @Post('seller')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createSeller(
    @Req() req: Request,
    @Res() res: any,
    @Body() sellerData: CreateSellerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateSellerDto> {
    if (file) {
      const filePath = buildPath(file.filename, 'seller');
      await this.s3Service.uploadPhoto(file, filePath);
      sellerData.avatar = filePath;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.sellerService.createSeller(sellerData));
  }

  @ApiOperation({ summary: 'Seller update by admin' })
  @Patch('/seller/:idSeller')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateSeller(
    @Param('idSeller') idSeller: string,
    @Body() sellerData: UpdateSellerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Seller> {
    if (file) {
      const filePath = buildPath(file.filename, 'seller');
      await this.s3Service.uploadPhoto(file, filePath);
      sellerData.avatar = filePath;
    }
    return this.sellerService.updateSeller(idSeller, sellerData);
  }

  @ApiOperation({ summary: 'Get seller by ID from admin' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @Get('/seller/:idSeller')
  async getSellerById(
    @Req() req: Request,
    @Res() res: any,
    @Param('idSeller') idSeller: string,
  ): Promise<Seller> {
    return res
      .status(HttpStatus.OK)
      .json(await this.sellerService.getSellerById(idSeller));
  }

  @ApiOperation({ summary: 'Get a manager named admin' })
  @ApiParam({ name: 'firstName', required: true })
  @Get('/seller/name/:firstName')
  async getSellerByFirstName(
    @Req() req: Request,
    @Res() res: any,
    @Param('firstName') firstName: string,
  ): Promise<Seller> {
    try {
      const seller = await this.sellerService.getSellerByName(firstName);
      return res.status(HttpStatus.OK).json(seller);
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

  @ApiOperation({ summary: 'Get a list of sellers from the admin' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get('/sellers/list')
  async getSellerList(@Req() reg: Request, @Res() res: any): Promise<Seller[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.sellerService.getSellerList());
  }

  @ApiOperation({ summary: 'Removal of the seller by the admin' })
  @ApiParam({ name: 'idSeller', required: true })
  @Delete('/seller/:idSeller')
  async deleteSeller(
    @Param('idSeller') idSeller: string,
    @Res() res: any,
  ): Promise<void> {
    await this.sellerService.deleteSeller(idSeller);
    res.sendStatus(HttpStatus.OK);
  }

  //SellerPremium
  @ApiOperation({ summary: 'Upgrade seller to premium by admin' })
  @ApiParam({ name: 'sellerId', required: true })
  @Post('/sellerPremium/:sellerId')
  async upgradeToPremium(@Param('sellerId') sellerId: string): Promise<void> {
    await this.sellerPremiumService.upgradeToPremium(sellerId);
  }

  @ApiOperation({
    summary: "The admin canceled the seller's premium subscription",
  })
  @ApiParam({ name: 'sellerId', required: true })
  @Post('/sellerPremium/:sellerId/cancel')
  async cancelPremium(@Param('sellerId') sellerId: string): Promise<void> {
    await this.sellerPremiumService.cancelPremium(sellerId);
  }

  @ApiOperation({ summary: 'Get the number of views for a seller by admin' })
  @ApiParam({ name: 'sellerId', required: true })
  @Get('/sellerPremium/:sellerId/views')
  async getViewsCount(@Param('sellerId') sellerId: string): Promise<number> {
    return this.sellerPremiumService.getViewsCount(sellerId);
  }

  @ApiOperation({
    summary: 'Get the number of views per period for a seller by admin',
  })
  @ApiParam({ name: 'sellerId', required: true })
  @ApiParam({ name: 'period', enum: ['day', 'week', 'month'], required: true })
  @Get('/sellerPremium/:sellerId/views/:period')
  async getViewsCountPerPeriod(
    @Param('sellerId') sellerId: string,
    @Param('period') period: Period,
  ): Promise<number> {
    return this.sellerPremiumService.getViewsCountPerPeriod(sellerId, period);
  }

  @ApiOperation({
    summary: "Get the average price in the seller's region from the admin",
  })
  @ApiParam({ name: 'sellerId', required: true })
  @Get('/sellerPremium/:sellerId/averagePrice/region')
  async getAveragePriceRegion(
    @Param('sellerId') sellerId: string,
  ): Promise<number | null> {
    return this.sellerPremiumService.getAveragePriceRegion(sellerId);
  }

  @ApiOperation({ summary: 'Get the average price for Ukraine from Admin' })
  @ApiParam({ name: 'sellerId', required: true })
  @Get('/sellerPremium/:sellerId/averagePrice/ukraine')
  async getAveragePriceUkraine(
    @Param('sellerId') sellerId: string,
  ): Promise<number | null> {
    return this.sellerPremiumService.getAveragePriceUkraine(sellerId);
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

  @ApiOperation({ summary: "Get all the seller's cars by admin" })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @Get('/seller/:idSeller/car')
  async getCars(
    @Req() req: Request,
    @Res() res: any,
    @Param('idSeller') idSeller: string,
  ): Promise<Car[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.sellerService.getCars(idSeller));
  }

  @ApiOperation({ summary: 'Get the car from the admin' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @Get('/seller/:idSeller/car/:idCar')
  async getCar(
    @Req() req: Request,
    @Res() res: any,
    @Param('idSeller') idSeller: string,
    @Param('idCar') idCar: string,
  ): Promise<Car> {
    return res
      .status(HttpStatus.OK)
      .json(await this.sellerService.getCar(idSeller, idCar));
  }

  @ApiOperation({ summary: 'Removal of the car by the admin' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @ApiParam({ name: 'idCar', type: 'string', description: 'Car ID' })
  @Delete('/seller/:idSeller/car/:idCar')
  async deleteCar(
    @Param('idSeller') idSeller: string,
    @Param('idCar') idCar: string,
    @Res() res: any,
  ): Promise<void> {
    await this.sellerService.deleteCar(idSeller, idCar);
    res.sendStatus(HttpStatus.OK);
  }

  //-----------------------
  @ApiOperation({ summary: 'Create a new car showroom as an admin' })
  @Post('/carshowroom')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async createCarshowroom() {}

  @ApiOperation({ summary: 'Update of the car showroom admin' })
  @Patch('/carshowroom/:idCarshowroom')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async updateCarshowroom() {}

  @ApiOperation({ summary: 'Get a list of car car showroom from the admin' })
  @Get('/carshowroom')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomList() {}

  @ApiOperation({ summary: 'Get a car car showroom by ID from the admin' })
  @Get('/carshowroom/:idCarshowroom')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroom() {}

  @ApiOperation({ summary: 'Removal of car showroom by admin' })
  @Delete('/carshowroom/:idCarshowroom')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async deleteCarshowroom() {}

  //-----------------------
  @ApiOperation({ summary: 'Create a new car showroom admin using admin' })
  @Post('/carshowroomAdmin')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async createCarshowroomAdmin() {}

  @ApiOperation({ summary: 'Update the car showroom administrator to admin' })
  @Patch('/carshowroomAdmin/:idCarshowroomAdmin')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async updateCarshowroomAdmin() {}

  @ApiOperation({ summary: 'Get a list of car showroom admins by admin' })
  @Get('/carshowroomAdmin')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomAdminList() {}

  @ApiOperation({ summary: 'Get car showroom admin by ID from admin' })
  @Get('/carshowroomAdmin/:idCarshowroomAdmin')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomAdmin() {}

  @ApiOperation({
    summary: 'Delete the car showroom administrator as an admin',
  })
  @Delete('/carshowroomAdmin/:idCarshowroomAdmin')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async deleteCarshowroomAdmin() {}

  //----------------------
  @ApiOperation({ summary: 'Create a new car showroom manager as an admin' })
  @Post('/carshowroomManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async createCarshowroomManager() {}

  @ApiOperation({ summary: 'Update the car showroom manager as an admin' })
  @Patch('/carshowroomManager/:idCarshowroomManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async updateCarshowroomManager() {}

  @ApiOperation({ summary: 'Get a list of car showroom managers from admin' })
  @Get('/carshowroomManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomManagerList() {}

  @ApiOperation({ summary: 'Get a car showroom manager by ID from admin' })
  @Get('/carshowroomManager/:idCarshowroomManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomManager() {}

  @ApiOperation({ summary: 'Delete the manager of the car showroom admin' })
  @Delete('/carshowroomManager/:idCarshowroomManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async deleteCarshowroomManager() {}

  //-------------------------
  @ApiOperation({ summary: 'Create a new car showroom mechanic as an admin' })
  @Post('/carshowroomAutoMechanic')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async createCarshowroomAutoMechanic() {}

  @ApiOperation({ summary: 'Update the car showroom mechanic as an admin' })
  @Patch('/carshowroomAutoMechanic/:idCarshowroomAutoMechanic')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async updateCarshowroomAutoMechanic() {}

  @ApiOperation({
    summary: 'Get a list of car showroom mechanics from the admin',
  })
  @Get('/carshowroomAutoMechanic')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomAutoMechanicList() {}

  @ApiOperation({ summary: 'Get a car showroom mechanic by ID from the admin' })
  @Get('/carshowroomAutoMechanic/:idCarshowroomAutoMechanic')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomAutoMechanic() {}

  @ApiOperation({ summary: 'Delete car mechanic admin' })
  @Delete('/carshowroomAutoMechanic/:idCarshowroomAutoMechanic')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async deleteCarshowroomAutoMechanic() {}

  //------------------
  @ApiOperation({ summary: 'The admin will create a new car showroom' })
  @Post('/carshowroomSales')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async createCarshowroomSales() {}

  @ApiOperation({ summary: 'Update of the car showroom by the admin' })
  @Patch('/carshowroomSales/:idCarshowroomSales')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async updateCarshowroomSales() {}

  @ApiOperation({
    summary: 'Get a list of car showroom sellers from the admin',
  })
  @Get('/carshowroomSales')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomSalesList() {}

  @ApiOperation({ summary: 'Get car showroom by ID from admin' })
  @Get('/carshowroomSales/:idCarshowroomSales')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomSales() {}

  @ApiOperation({ summary: 'Delete the seller of the car showroom admin' })
  @Delete('/carshowroomSales/:idCarshowroomSales')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async deleteCarshowroomSales() {}

  //CardealershipServiceManager
  @ApiOperation({
    summary: 'Create a new car showroom service manager as an admin',
  })
  @Post('/carshowroomServiceManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async createCarshowroomServiceManager() {}

  @ApiOperation({
    summary: 'Update of the car showroom service manager by admin',
  })
  @Patch('/carshowroomServiceManager/:idCarshowroomServiceManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async updateCarshowroomServiceManager() {}

  @ApiOperation({
    summary: 'Get a list of car showroom service managers from the admin',
  })
  @Get('/carshowroomServiceManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomServiceManagerList() {}

  @ApiOperation({
    summary: 'Get the car showroom service manager by ID from the admin',
  })
  @Get('/carshowroomServiceManager/:idCarshowroomServiceManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getCarshowroomServiceManager() {}

  @ApiOperation({ summary: 'Removal of car showroom service manager admin' })
  @Delete('/carshowroomServiceManager/:idCarshowroomServiceManager')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async deleteCarshowroomServiceManager() {}
}
