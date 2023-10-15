import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { v4 as uuidv4 } from 'uuid'
import Application from '@ioc:Adonis/Core/Application'

export default class CrudsController {
    private model
    private createValidor
    private updateValidator
    private otherAddFunction

    constructor(model, createValidor, updateValidator, otherAddFunction:any) {
        this.model = model;
        this.createValidor = createValidor;
        this.updateValidator = updateValidator;
        this.otherAddFunction = otherAddFunction
    }

    public async index({ }: HttpContextContract) {
        return this.model.
            query().orderBy('created_at', 'desc');
    }

    public async store({ request }: HttpContextContract) {
        const data = await request.validate(this.createValidor)
        const generateFilename = function (file: any) {
            const name = uuidv4().replace(/-/g, '') + '.' + file?.extname
            return name
        }
        if (data.media) {
            const newName = generateFilename(data.media)
            await data.media.move(Application.tmpPath("uploads"), { name: newName })
            data.media = newName as any
        }
        const element = new this.model().fill(data)
        const elementSave = await element.save();
        if (this.otherAddFunction) {
            this.otherAddFunction(elementSave)
        }
        return elementSave;

    }

    public async show({ params }: HttpContextContract) {
        return await this.model.findOrFail(params.id)
    }

    public async update({ params, request }: HttpContextContract) {
        const data = await request.validate(this.updateValidator)
        const generateFilename = function (file: any) {
            const name = uuidv4().replace(/-/g, '') + '.' + file?.extname
            return name
        }
        if (data.media) {
            const newName = generateFilename(data.media)
            await data.media.move(Application.tmpPath("uploads"), { name: newName })
            data.media = newName as any
        }
        const typeCar = await this.model.findOrFail(params.id)
        typeCar.merge(data)
        return await typeCar.save()
    }

    public async destroy({ params }: HttpContextContract) {
        const typeCar = await this.model.findOrFail(params.id)
        await typeCar.delete()
    }
}
