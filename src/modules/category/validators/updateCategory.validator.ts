import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    category_name: Joi.string()
      .pattern(/^[\w-]+$/)
      .message('Name can only be numbers, letters, hyphens and underscores.')
      .required(),
    category_code: Joi.string()
      .pattern(/^[A-Z][A-Z_\-]*[A-Z]$/)
      .message('Code can only be upper case letters, underscore and numbers')
      .required(),
    discount: Joi.string()
      .pattern(/^[0-9]+$/)
      .message('Discount values can only be number.')
      .required(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    category_id: Joi.string()
      .pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      .required(),
  }),
});
