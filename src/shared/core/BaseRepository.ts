import { Document, FilterQuery, HydratedDocument, Model, UnpackedIntersection } from 'mongoose';
import { cleanObjectData } from '../utils';

/**
 * @SchemaModel is the mongoose model interface to be used.
 * @CreateDataDTO is the insert/create method's data interface(DTO).
 * @E is a string type used in the get unique data method. E.g "_id"|"email"
 */
export default abstract class BaseRepository<SchemaModel, CreateDataDTO, E = ''> {
  private model;

  constructor(SchemaModel: Model<SchemaModel, {}, {}, {}, any>) {
    this.model = SchemaModel;
  }

  async create(data: CreateDataDTO): Promise<SchemaModel> {
    const result = await this.model.create(data);
    return result;
  }

  async save(model: Document<string | Object> & SchemaModel) {
    await model.save();
  }

  async findByUniqueData(
    field: E | '_id',
    value: string,
    populateData?: string | string[]
  ): Promise<UnpackedIntersection<HydratedDocument<SchemaModel, {}, {}>, {}> | null> {
    const filter: any = {};
    filter[field] = value;
    cleanObjectData(filter);

    const result = await this.model.findOne(filter).populate(populateData as string | string[]);

    return result;
  }

  async fetchAll(data?: FilterQuery<SchemaModel>, page?: string | number, size?: string | number, populateData?: string | string[]) {
    const filter = data || {};
    cleanObjectData(filter);
    console.log(page, size,);

    // page = page ? Number(page) : 1;
    // size = size ? Number(size) : 5;

    const results = await this.model
      .find(filter)
      .limit(Number(size) || 5)
      .skip((Number(page) - 1) * Number(size))
      .sort({
        name: 'asc',
      })
      .populate(populateData as string | string[]);

    return results;
  }

  async updateById(_id: string, updateData: Partial<SchemaModel>): Promise<void> {
    cleanObjectData(updateData);

    await this.model.updateOne({ _id }, updateData);

    return;
  }

  async deleteById(_id: string): Promise<void> {
    await this.model.deleteOne({ _id });

    return;
  }

  async deleteMany(): Promise<void> {
    await this.model.deleteMany({});

    return;
  }
}
