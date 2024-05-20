import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    category_id:
      Joi.string()
      .required(),
  }),
});
