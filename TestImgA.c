/* C:\Users\Doug\Documents\FDT\Design_ImageCompression\TestImgA.jpg (1/23/2024 01:14:24 PM)
   StartOffset(d): 00000000, EndOffset(d): 00001745, Length(d): 00001746 */
#include <stdio.h>

unsigned char rawData[1746] = {
	0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01,
	0x01, 0x01, 0x00, 0xC0, 0x00, 0xC0, 0x00, 0x00, 0xFF, 0xE1, 0x00, 0x22,
	0x45, 0x78, 0x69, 0x66, 0x00, 0x00, 0x4D, 0x4D, 0x00, 0x2A, 0x00, 0x00,
	0x00, 0x08, 0x00, 0x01, 0x01, 0x12, 0x00, 0x03, 0x00, 0x00, 0x00, 0x01,
	0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43,
	0x00, 0x02, 0x01, 0x01, 0x02, 0x01, 0x01, 0x02, 0x02, 0x02, 0x02, 0x02,
	0x02, 0x02, 0x02, 0x03, 0x05, 0x03, 0x03, 0x03, 0x03, 0x03, 0x06, 0x04,
	0x04, 0x03, 0x05, 0x07, 0x06, 0x07, 0x07, 0x07, 0x06, 0x07, 0x07, 0x08,
	0x09, 0x0B, 0x09, 0x08, 0x08, 0x0A, 0x08, 0x07, 0x07, 0x0A, 0x0D, 0x0A,
	0x0A, 0x0B, 0x0C, 0x0C, 0x0C, 0x0C, 0x07, 0x09, 0x0E, 0x0F, 0x0D, 0x0C,
	0x0E, 0x0B, 0x0C, 0x0C, 0x0C, 0xFF, 0xDB, 0x00, 0x43, 0x01, 0x02, 0x02,
	0x02, 0x03, 0x03, 0x03, 0x06, 0x03, 0x03, 0x06, 0x0C, 0x08, 0x07, 0x08,
	0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C,
	0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C,
	0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C,
	0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C, 0x0C,
	0x0C, 0x0C, 0xFF, 0xC0, 0x00, 0x11, 0x08, 0x00, 0x1D, 0x00, 0x1D, 0x03,
	0x01, 0x22, 0x00, 0x02, 0x11, 0x01, 0x03, 0x11, 0x01, 0xFF, 0xC4, 0x00,
	0x1F, 0x00, 0x00, 0x01, 0x05, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x02, 0x03, 0x04, 0x05,
	0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0xFF, 0xC4, 0x00, 0xB5, 0x10, 0x00,
	0x02, 0x01, 0x03, 0x03, 0x02, 0x04, 0x03, 0x05, 0x05, 0x04, 0x04, 0x00,
	0x00, 0x01, 0x7D, 0x01, 0x02, 0x03, 0x00, 0x04, 0x11, 0x05, 0x12, 0x21,
	0x31, 0x41, 0x06, 0x13, 0x51, 0x61, 0x07, 0x22, 0x71, 0x14, 0x32, 0x81,
	0x91, 0xA1, 0x08, 0x23, 0x42, 0xB1, 0xC1, 0x15, 0x52, 0xD1, 0xF0, 0x24,
	0x33, 0x62, 0x72, 0x82, 0x09, 0x0A, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x25,
	0x26, 0x27, 0x28, 0x29, 0x2A, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A,
	0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4A, 0x53, 0x54, 0x55, 0x56,
	0x57, 0x58, 0x59, 0x5A, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6A,
	0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7A, 0x83, 0x84, 0x85, 0x86,
	0x87, 0x88, 0x89, 0x8A, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99,
	0x9A, 0xA2, 0xA3, 0xA4, 0xA5, 0xA6, 0xA7, 0xA8, 0xA9, 0xAA, 0xB2, 0xB3,
	0xB4, 0xB5, 0xB6, 0xB7, 0xB8, 0xB9, 0xBA, 0xC2, 0xC3, 0xC4, 0xC5, 0xC6,
	0xC7, 0xC8, 0xC9, 0xCA, 0xD2, 0xD3, 0xD4, 0xD5, 0xD6, 0xD7, 0xD8, 0xD9,
	0xDA, 0xE1, 0xE2, 0xE3, 0xE4, 0xE5, 0xE6, 0xE7, 0xE8, 0xE9, 0xEA, 0xF1,
	0xF2, 0xF3, 0xF4, 0xF5, 0xF6, 0xF7, 0xF8, 0xF9, 0xFA, 0xFF, 0xC4, 0x00,
	0x1F, 0x01, 0x00, 0x03, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
	0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x02, 0x03, 0x04, 0x05,
	0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0xFF, 0xC4, 0x00, 0xB5, 0x11, 0x00,
	0x02, 0x01, 0x02, 0x04, 0x04, 0x03, 0x04, 0x07, 0x05, 0x04, 0x04, 0x00,
	0x01, 0x02, 0x77, 0x00, 0x01, 0x02, 0x03, 0x11, 0x04, 0x05, 0x21, 0x31,
	0x06, 0x12, 0x41, 0x51, 0x07, 0x61, 0x71, 0x13, 0x22, 0x32, 0x81, 0x08,
	0x14, 0x42, 0x91, 0xA1, 0xB1, 0xC1, 0x09, 0x23, 0x33, 0x52, 0xF0, 0x15,
	0x62, 0x72, 0xD1, 0x0A, 0x16, 0x24, 0x34, 0xE1, 0x25, 0xF1, 0x17, 0x18,
	0x19, 0x1A, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x35, 0x36, 0x37, 0x38, 0x39,
	0x3A, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4A, 0x53, 0x54, 0x55,
	0x56, 0x57, 0x58, 0x59, 0x5A, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69,
	0x6A, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7A, 0x82, 0x83, 0x84,
	0x85, 0x86, 0x87, 0x88, 0x89, 0x8A, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97,
	0x98, 0x99, 0x9A, 0xA2, 0xA3, 0xA4, 0xA5, 0xA6, 0xA7, 0xA8, 0xA9, 0xAA,
	0xB2, 0xB3, 0xB4, 0xB5, 0xB6, 0xB7, 0xB8, 0xB9, 0xBA, 0xC2, 0xC3, 0xC4,
	0xC5, 0xC6, 0xC7, 0xC8, 0xC9, 0xCA, 0xD2, 0xD3, 0xD4, 0xD5, 0xD6, 0xD7,
	0xD8, 0xD9, 0xDA, 0xE2, 0xE3, 0xE4, 0xE5, 0xE6, 0xE7, 0xE8, 0xE9, 0xEA,
	0xF2, 0xF3, 0xF4, 0xF5, 0xF6, 0xF7, 0xF8, 0xF9, 0xFA, 0xFF, 0xDA, 0x00,
	0x0C, 0x03, 0x01, 0x00, 0x02, 0x11, 0x03, 0x11, 0x00, 0x3F, 0x00, 0x8F,
	0xE3, 0xB7, 0xC0, 0x9D, 0x73, 0xF6, 0x4E, 0xF1, 0xBD, 0xF6, 0x9F, 0xA8,
	0x58, 0xDE, 0x43, 0xA1, 0xC3, 0x71, 0xE5, 0x5C, 0x5B, 0xCB, 0x97, 0x9B,
	0x45, 0x95, 0x8E, 0x40, 0x27, 0x9D, 0xF0, 0xB6, 0x41, 0x57, 0x04, 0x82,
	0x18, 0x72, 0x49, 0x06, 0x4E, 0x92, 0x7D, 0x07, 0x4F, 0xFD, 0xAD, 0xB4,
	0xEB, 0x5D, 0x2F, 0x50, 0xBF, 0xB3, 0xD3, 0xFC, 0x6C, 0xEB, 0x1C, 0x16,
	0x5A, 0xBD, 0xC3, 0x95, 0xB7, 0xD7, 0xA2, 0xE0, 0x24, 0x57, 0x0E, 0xA0,
	0x9F, 0xB4, 0x28, 0xC7, 0x97, 0x2E, 0x0F, 0x98, 0x00, 0x46, 0xCB, 0x6C,
	0x63, 0xF2, 0xDF, 0xC0, 0x2F, 0x8F, 0xBA, 0x37, 0xEC, 0x25, 0xE0, 0xDF,
	0x0D, 0xB2, 0xF8, 0x93, 0x56, 0xF8, 0x9F, 0xFB, 0x0D, 0xFC, 0x4F, 0xBE,
	0x9E, 0xC7, 0xC1, 0xFE, 0x30, 0xBE, 0xB3, 0xF3, 0xF5, 0x9F, 0x85, 0x1A,
	0xA4, 0x99, 0x9A, 0xE7, 0x41, 0xD6, 0xAD, 0xA1, 0x0D, 0xB1, 0x97, 0xCC,
	0x69, 0x26, 0xB7, 0x8C, 0x14, 0x9D, 0x18, 0xDF, 0xD8, 0x87, 0xDF, 0x75,
	0x6B, 0x3F, 0xB8, 0x7C, 0x49, 0xF8, 0x6D, 0x37, 0xC0, 0xBB, 0xD8, 0xEF,
	0xAC, 0x64, 0x8F, 0x54, 0xF0, 0x3E, 0xA8, 0xB1, 0x5D, 0x5B, 0xDC, 0x5A,
	0xDC, 0x2D, 0xE4, 0x56, 0x91, 0xCE, 0xAB, 0x24, 0x33, 0x45, 0x34, 0x65,
	0x92, 0x6B, 0x59, 0x51, 0xD1, 0xE3, 0x95, 0x19, 0x95, 0xD5, 0xD4, 0x86,
	0x6D, 0xCA, 0xD2, 0x7C, 0x67, 0x0A, 0xF1, 0x56, 0x27, 0x84, 0xB1, 0x3F,
	0xD8, 0x39, 0xF5, 0xEB, 0x60, 0x2B, 0xB6, 0xA3, 0x26, 0xAE, 0xD5, 0xD5,
	0x9E, 0xFA, 0x73, 0xDB, 0x49, 0x45, 0xDA, 0x35, 0x62, 0xBA, 0x49, 0x27,
	0x1F, 0xBC, 0xE2, 0xCE, 0x13, 0xC5, 0xF1, 0x36, 0x2B, 0xFE, 0x22, 0x4F,
	0x86, 0xAF, 0xEA, 0xFC, 0x41, 0x87, 0xB4, 0xB1, 0x18, 0x78, 0xE9, 0x1C,
	0x5C, 0x53, 0xBB, 0x9C, 0x57, 0x5A, 0xB7, 0xD7, 0xBC, 0xE5, 0xFF, 0x00,
	0x4F, 0x7F, 0x8D, 0xC8, 0xF8, 0xC7, 0xC1, 0x13, 0xC2, 0xFA, 0x97, 0x80,
	0x3E, 0x21, 0x69, 0xB3, 0x06, 0x59, 0x56, 0xDE, 0x45, 0x96, 0x46, 0x8F,
	0xCF, 0x2A, 0xCB, 0x22, 0x06, 0x64, 0x60, 0x72, 0x70, 0xAC, 0xAC, 0x0E,
	0x1C, 0x63, 0x05, 0x81, 0xCB, 0x79, 0xD6, 0x8F, 0xE1, 0x7F, 0x88, 0x9F,
	0x04, 0xE7, 0xB8, 0xD1, 0x74, 0x7D, 0x25, 0xFC, 0x69, 0xE1, 0xF8, 0xF6,
	0xB6, 0x9B, 0x74, 0xFA, 0xA4, 0x56, 0x77, 0x16, 0xB1, 0x73, 0xFB, 0x89,
	0x77, 0xFD, 0xFD, 0xBC, 0x60, 0x81, 0x8C, 0x74, 0xC0, 0x21, 0x13, 0xEC,
	0x5B, 0x3B, 0xCD, 0x1F, 0xF6, 0xBF, 0xF0, 0x7D, 0xAF, 0x86, 0x7C, 0x4D,
	0x75, 0x6D, 0x6F, 0xE3, 0x1B, 0x78, 0x44, 0x5A, 0x0E, 0xBD, 0x29, 0xCA,
	0x6A, 0x49, 0xD5, 0x6D, 0x6E, 0x58, 0x72, 0xD9, 0x27, 0xE4, 0x7E, 0x4E,
	0x4E, 0x46, 0x58, 0x91, 0x37, 0x87, 0x6B, 0x73, 0xEB, 0x3F, 0x09, 0x75,
	0xDB, 0xCD, 0x03, 0xC4, 0x9A, 0x6E, 0xA5, 0xFD, 0xA1, 0xA7, 0x49, 0xE5,
	0x1D, 0xB1, 0x87, 0x90, 0x0E, 0xB8, 0x7E, 0x70, 0x78, 0x20, 0x87, 0x52,
	0x43, 0xA9, 0x04, 0x67, 0xA9, 0xFD, 0xB3, 0x1D, 0x96, 0xD6, 0xA6, 0xE9,
	0xE6, 0x19, 0x6E, 0x2D, 0x42, 0x72, 0x8A, 0xE4, 0xAE, 0xF9, 0xA5, 0x0A,
	0x90, 0xD9, 0x2A, 0xAE, 0x31, 0x94, 0x9C, 0x92, 0x56, 0x85, 0x47, 0x17,
	0x2D, 0x3D, 0x95, 0x6F, 0x7D, 0x46, 0x4F, 0xF1, 0xFC, 0x83, 0x3E, 0xCC,
	0x33, 0x6C, 0x2E, 0x23, 0x39, 0xF0, 0xE7, 0x07, 0x4E, 0xA4, 0xAA, 0xCA,
	0xF8, 0xDC, 0xA6, 0xA4, 0x7F, 0x77, 0x1A, 0xD7, 0x57, 0xC4, 0x61, 0xA9,
	0xBA, 0x94, 0xF9, 0x6E, 0xD2, 0xF6, 0xB4, 0xA3, 0x24, 0xA3, 0xA4, 0xA0,
	0xA5, 0x49, 0x28, 0xD2, 0xF6, 0x5F, 0xDA, 0x4F, 0xF6, 0x6C, 0xD5, 0x7E,
	0x22, 0x78, 0xAB, 0xE2, 0x97, 0xC4, 0x8F, 0x86, 0xFF, 0x00, 0x0B, 0x74,
	0xFB, 0x9F, 0x8A, 0x37, 0x36, 0x82, 0xCF, 0xF6, 0x96, 0xFD, 0x9A, 0x6F,
	0x0B, 0xC7, 0xA6, 0x7C, 0x57, 0xB0, 0x47, 0x12, 0x1D, 0x6F, 0x47, 0x11,
	0x96, 0x78, 0xF5, 0x24, 0x77, 0x17, 0x10, 0xDC, 0x5B, 0x96, 0x98, 0x4C,
	0xEB, 0x2C, 0x6D, 0x24, 0xB2, 0x11, 0xA9, 0xFC, 0x93, 0xF0, 0x0B, 0xE3,
	0xEE, 0x8D, 0xFB, 0x09, 0x78, 0x37, 0xC3, 0x6C, 0xBE, 0x24, 0xD5, 0xBE,
	0x27, 0xFE, 0xC3, 0x7F, 0x13, 0xEF, 0xA7, 0xB1, 0xF0, 0x7F, 0x8C, 0x2F,
	0xAC, 0xFC, 0xFD, 0x67, 0xE1, 0x46, 0xA9, 0x26, 0x66, 0xB9, 0xD0, 0x75,
	0xAB, 0x68, 0x43, 0x6C, 0x65, 0xF3, 0x1A, 0x49, 0xAD, 0xE3, 0x05, 0x27,
	0x46, 0x37, 0xF6, 0x21, 0xF7, 0xDD, 0x5A, 0xCF, 0xFA, 0x51, 0xE2, 0xAF,
	0x10, 0xF8, 0x8B, 0xE2, 0x97, 0x8A, 0x3C, 0x7D, 0x6B, 0x7D, 0xAD, 0xB5,
	0x9F, 0xC5, 0x4F, 0xD9, 0x87, 0x45, 0xD5, 0xB5, 0x6F, 0x0C, 0xFC, 0x44,
	0xB2, 0x87, 0xCB, 0xD5, 0x35, 0x28, 0x34, 0xC9, 0xDD, 0x25, 0xB2, 0xBF,
	0x8D, 0x99, 0x92, 0xE6, 0x19, 0xD2, 0x42, 0x06, 0xE3, 0x94, 0x3B, 0xCB,
	0x79, 0xC2, 0x69, 0x96, 0x4F, 0x93, 0x7F, 0xE0, 0xA7, 0x5A, 0x8F, 0x86,
	0xBF, 0x67, 0xFF, 0x00, 0xD9, 0x7B, 0xC2, 0x1F, 0xB6, 0x86, 0x91, 0xE0,
	0xCD, 0x16, 0x4F, 0x0F, 0xFE, 0xD3, 0x1A, 0xCF, 0xFC, 0x20, 0xFF, 0x00,
	0x1C, 0xBE, 0x0F, 0xBB, 0x3A, 0xF8, 0x5F, 0xE2, 0x1B, 0x2B, 0x6A, 0x12,
	0x0D, 0x5A, 0x27, 0x07, 0xCC, 0xD3, 0xB5, 0x14, 0x96, 0xC2, 0x59, 0xA2,
	0xB9, 0x88, 0x3C, 0x91, 0x4F, 0x32, 0x4A, 0x18, 0xB8, 0xBA, 0x37, 0x9F,
	0x8E, 0x46, 0x38, 0x7C, 0xDB, 0x0F, 0x3C, 0xB7, 0x1F, 0x1E, 0x75, 0x24,
	0xF7, 0xDD, 0xA4, 0xED, 0x7D, 0x36, 0x94, 0x5D, 0xB5, 0x5D, 0x6C, 0xD7,
	0x65, 0xFA, 0xCE, 0x5F, 0x9B, 0xD0, 0xC4, 0xE5, 0xF4, 0xB8, 0xEF, 0x85,
	0x6F, 0x42, 0x0A, 0xAF, 0xB2, 0xA9, 0x4D, 0xEF, 0x46, 0xBD, 0x9C, 0x9C,
	0x22, 0xDB, 0x7C, 0xF4, 0xA4, 0xA3, 0x27, 0x1D, 0x64, 0xD2, 0x4E, 0x13,
	0x6E, 0xD1, 0x9C, 0xE1, 0xF8, 0x93, 0xF0, 0xDA, 0x6F, 0x81, 0x77, 0xB1,
	0xDF, 0x58, 0xC9, 0x1E, 0xA9, 0xE0, 0x7D, 0x51, 0x62, 0xBA, 0xB7, 0xB8,
	0xB5, 0xB8, 0x5B, 0xC8, 0xAD, 0x23, 0x9D, 0x56, 0x48, 0x66, 0x8A, 0x68,
	0xCB, 0x24, 0xD6, 0xB2, 0xA3, 0xA3, 0xC7, 0x2A, 0x33, 0x2B, 0xAB, 0xA9,
	0x0C, 0xDB, 0x95, 0xA4, 0xF4, 0xAF, 0x86, 0xDF, 0xB4, 0x5E, 0x9B, 0xA3,
	0x78, 0x7A, 0x1B, 0x4F, 0x13, 0x78, 0x3F, 0x41, 0xF1, 0xD4, 0x76, 0xB1,
	0x24, 0x5A, 0x75, 0xDD, 0xF2, 0x44, 0xD3, 0xDB, 0x5B, 0x8C, 0x91, 0x10,
	0x91, 0xA3, 0x90, 0xB4, 0x60, 0xB6, 0x54, 0x71, 0xB7, 0x24, 0x64, 0x8C,
	0x05, 0xF0, 0x3F, 0x80, 0x5A, 0x4E, 0xA3, 0xFB, 0x07, 0x7F, 0xC1, 0x58,
	0xFE, 0x21, 0x7E, 0xC1, 0x92, 0x6B, 0x57, 0x9F, 0x10, 0xBE, 0x17, 0x69,
	0x36, 0xDA, 0x86, 0xAB, 0xE1, 0x2D, 0x4B, 0x59, 0x45, 0x5D, 0x43, 0xC3,
	0x69, 0xFD, 0x84, 0xFE, 0x20, 0x7B, 0x42, 0x14, 0x14, 0x9E, 0xDE, 0x58,
	0xCC, 0x90, 0xCB, 0x16, 0x23, 0x4F, 0xB4, 0x31, 0xBA, 0x89, 0x60, 0xF3,
	0x2E, 0x60, 0xB8, 0xB9, 0xF1, 0x96, 0x09, 0x3E, 0x01, 0xF8, 0xD9, 0xB4,
	0xAD, 0x22, 0x45, 0x9F, 0x4C, 0xBC, 0x81, 0x6F, 0x60, 0x82, 0xE4, 0x33,
	0xFD, 0x8F, 0x73, 0xBA, 0x98, 0xD5, 0xB7, 0x64, 0xAE, 0x54, 0x91, 0x9F,
	0x5E, 0xE7, 0x2C, 0xDC, 0xDC, 0x21, 0xC7, 0x98, 0xEE, 0x09, 0xC6, 0xCB,
	0x21, 0xCC, 0xE1, 0xF5, 0xBC, 0x2D, 0x44, 0xE7, 0x04, 0xE4, 0xE2, 0xDD,
	0xB4, 0xBF, 0x32, 0x4D, 0xC2, 0x6B, 0x69, 0x34, 0xB9, 0x6A, 0x47, 0x75,
	0x7B, 0x59, 0xF1, 0xD7, 0x82, 0x35, 0xFC, 0x54, 0x7F, 0xEB, 0x9F, 0x87,
	0xD3, 0x58, 0x1C, 0xF2, 0x2F, 0x97, 0x11, 0x1B, 0xF2, 0xD3, 0xAE, 0x9D,
	0xAF, 0x52, 0xF6, 0x69, 0x54, 0xEB, 0x2B, 0xE9, 0x3B, 0x36, 0xDA, 0xA8,
	0xB9, 0xAA, 0xFF, 0x00, 0xFF, 0xD9
};

int main() {
    FILE *file = fopen("output.jpg", "wb");
    if (file != NULL) {
        fwrite(rawData, sizeof(rawData[0]), sizeof(rawData)/sizeof(rawData[0]), file);
        fclose(file);
    } else {
        printf("Error opening file!\n");
        return 1;
    }
    return 0;
}
