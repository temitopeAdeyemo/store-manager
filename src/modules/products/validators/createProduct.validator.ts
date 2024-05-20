import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    product_name: Joi.string()
      .pattern(/^[\w-]+$/)
      .message('Product Name can only be numbers, letters, hyphens and underscores.')
      .required(),
    product_code: Joi.string()
      .pattern(/^[A-Z][A-Z_\-]*[A-Z]$/)
      .message('Product Code can only be upper case letters, underscore and numbers')
      .required(),
    amount: Joi.number().positive().required(),
    discount: Joi.string()
      .pattern(/^[0-9]+$/)
      .message('Discount values can only be number.'),
    category: Joi.string().required(),
    quantity: Joi.string().required(),
    images: Joi.string(),
  }),
});
