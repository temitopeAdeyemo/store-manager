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
});
