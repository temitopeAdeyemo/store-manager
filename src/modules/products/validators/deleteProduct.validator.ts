import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    product_id: Joi.string().required(),
  }),
});
