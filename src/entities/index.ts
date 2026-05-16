/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: contactinquiries
 * Interface for ContactInquiries
 */
export interface ContactInquiries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  customerName?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  subject?: string;
  /** @wixFieldType text */
  message?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}


/**
 * Collection ID: services
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceTitle?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mainImage?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  estimatedDuration?: string;
  /** @wixFieldType text */
  price?: string;
}
