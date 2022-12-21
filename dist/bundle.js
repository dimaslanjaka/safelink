/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["safelinkify"] = factory();
	else
		root["safelinkify"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/crypto-js/aes.js":
/*!***************************************!*\
  !*** ./node_modules/crypto-js/aes.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./enc-base64 */ \"./node_modules/crypto-js/enc-base64.js\"), __webpack_require__(/*! ./md5 */ \"./node_modules/crypto-js/md5.js\"), __webpack_require__(/*! ./evpkdf */ \"./node_modules/crypto-js/evpkdf.js\"), __webpack_require__(/*! ./cipher-core */ \"./node_modules/crypto-js/cipher-core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function () {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var BlockCipher = C_lib.BlockCipher;\n\t    var C_algo = C.algo;\n\n\t    // Lookup tables\n\t    var SBOX = [];\n\t    var INV_SBOX = [];\n\t    var SUB_MIX_0 = [];\n\t    var SUB_MIX_1 = [];\n\t    var SUB_MIX_2 = [];\n\t    var SUB_MIX_3 = [];\n\t    var INV_SUB_MIX_0 = [];\n\t    var INV_SUB_MIX_1 = [];\n\t    var INV_SUB_MIX_2 = [];\n\t    var INV_SUB_MIX_3 = [];\n\n\t    // Compute lookup tables\n\t    (function () {\n\t        // Compute double table\n\t        var d = [];\n\t        for (var i = 0; i < 256; i++) {\n\t            if (i < 128) {\n\t                d[i] = i << 1;\n\t            } else {\n\t                d[i] = (i << 1) ^ 0x11b;\n\t            }\n\t        }\n\n\t        // Walk GF(2^8)\n\t        var x = 0;\n\t        var xi = 0;\n\t        for (var i = 0; i < 256; i++) {\n\t            // Compute sbox\n\t            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);\n\t            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;\n\t            SBOX[x] = sx;\n\t            INV_SBOX[sx] = x;\n\n\t            // Compute multiplication\n\t            var x2 = d[x];\n\t            var x4 = d[x2];\n\t            var x8 = d[x4];\n\n\t            // Compute sub bytes, mix columns tables\n\t            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);\n\t            SUB_MIX_0[x] = (t << 24) | (t >>> 8);\n\t            SUB_MIX_1[x] = (t << 16) | (t >>> 16);\n\t            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);\n\t            SUB_MIX_3[x] = t;\n\n\t            // Compute inv sub bytes, inv mix columns tables\n\t            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);\n\t            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);\n\t            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);\n\t            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);\n\t            INV_SUB_MIX_3[sx] = t;\n\n\t            // Compute next counter\n\t            if (!x) {\n\t                x = xi = 1;\n\t            } else {\n\t                x = x2 ^ d[d[d[x8 ^ x2]]];\n\t                xi ^= d[d[xi]];\n\t            }\n\t        }\n\t    }());\n\n\t    // Precomputed Rcon lookup\n\t    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];\n\n\t    /**\n\t     * AES block cipher algorithm.\n\t     */\n\t    var AES = C_algo.AES = BlockCipher.extend({\n\t        _doReset: function () {\n\t            var t;\n\n\t            // Skip reset of nRounds has been set before and key did not change\n\t            if (this._nRounds && this._keyPriorReset === this._key) {\n\t                return;\n\t            }\n\n\t            // Shortcuts\n\t            var key = this._keyPriorReset = this._key;\n\t            var keyWords = key.words;\n\t            var keySize = key.sigBytes / 4;\n\n\t            // Compute number of rounds\n\t            var nRounds = this._nRounds = keySize + 6;\n\n\t            // Compute number of key schedule rows\n\t            var ksRows = (nRounds + 1) * 4;\n\n\t            // Compute key schedule\n\t            var keySchedule = this._keySchedule = [];\n\t            for (var ksRow = 0; ksRow < ksRows; ksRow++) {\n\t                if (ksRow < keySize) {\n\t                    keySchedule[ksRow] = keyWords[ksRow];\n\t                } else {\n\t                    t = keySchedule[ksRow - 1];\n\n\t                    if (!(ksRow % keySize)) {\n\t                        // Rot word\n\t                        t = (t << 8) | (t >>> 24);\n\n\t                        // Sub word\n\t                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];\n\n\t                        // Mix Rcon\n\t                        t ^= RCON[(ksRow / keySize) | 0] << 24;\n\t                    } else if (keySize > 6 && ksRow % keySize == 4) {\n\t                        // Sub word\n\t                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];\n\t                    }\n\n\t                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;\n\t                }\n\t            }\n\n\t            // Compute inv key schedule\n\t            var invKeySchedule = this._invKeySchedule = [];\n\t            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {\n\t                var ksRow = ksRows - invKsRow;\n\n\t                if (invKsRow % 4) {\n\t                    var t = keySchedule[ksRow];\n\t                } else {\n\t                    var t = keySchedule[ksRow - 4];\n\t                }\n\n\t                if (invKsRow < 4 || ksRow <= 4) {\n\t                    invKeySchedule[invKsRow] = t;\n\t                } else {\n\t                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^\n\t                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];\n\t                }\n\t            }\n\t        },\n\n\t        encryptBlock: function (M, offset) {\n\t            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);\n\t        },\n\n\t        decryptBlock: function (M, offset) {\n\t            // Swap 2nd and 4th rows\n\t            var t = M[offset + 1];\n\t            M[offset + 1] = M[offset + 3];\n\t            M[offset + 3] = t;\n\n\t            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);\n\n\t            // Inv swap 2nd and 4th rows\n\t            var t = M[offset + 1];\n\t            M[offset + 1] = M[offset + 3];\n\t            M[offset + 3] = t;\n\t        },\n\n\t        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {\n\t            // Shortcut\n\t            var nRounds = this._nRounds;\n\n\t            // Get input, add round key\n\t            var s0 = M[offset]     ^ keySchedule[0];\n\t            var s1 = M[offset + 1] ^ keySchedule[1];\n\t            var s2 = M[offset + 2] ^ keySchedule[2];\n\t            var s3 = M[offset + 3] ^ keySchedule[3];\n\n\t            // Key schedule row counter\n\t            var ksRow = 4;\n\n\t            // Rounds\n\t            for (var round = 1; round < nRounds; round++) {\n\t                // Shift rows, sub bytes, mix columns, add round key\n\t                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];\n\t                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];\n\t                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];\n\t                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];\n\n\t                // Update state\n\t                s0 = t0;\n\t                s1 = t1;\n\t                s2 = t2;\n\t                s3 = t3;\n\t            }\n\n\t            // Shift rows, sub bytes, add round key\n\t            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];\n\t            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];\n\t            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];\n\t            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];\n\n\t            // Set output\n\t            M[offset]     = t0;\n\t            M[offset + 1] = t1;\n\t            M[offset + 2] = t2;\n\t            M[offset + 3] = t3;\n\t        },\n\n\t        keySize: 256/32\n\t    });\n\n\t    /**\n\t     * Shortcut functions to the cipher's object interface.\n\t     *\n\t     * @example\n\t     *\n\t     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);\n\t     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);\n\t     */\n\t    C.AES = BlockCipher._createHelper(AES);\n\t}());\n\n\n\treturn CryptoJS.AES;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/aes.js?");

/***/ }),

/***/ "./node_modules/crypto-js/cipher-core.js":
/*!***********************************************!*\
  !*** ./node_modules/crypto-js/cipher-core.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./evpkdf */ \"./node_modules/crypto-js/evpkdf.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t/**\n\t * Cipher core components.\n\t */\n\tCryptoJS.lib.Cipher || (function (undefined) {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var Base = C_lib.Base;\n\t    var WordArray = C_lib.WordArray;\n\t    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;\n\t    var C_enc = C.enc;\n\t    var Utf8 = C_enc.Utf8;\n\t    var Base64 = C_enc.Base64;\n\t    var C_algo = C.algo;\n\t    var EvpKDF = C_algo.EvpKDF;\n\n\t    /**\n\t     * Abstract base cipher template.\n\t     *\n\t     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)\n\t     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)\n\t     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.\n\t     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.\n\t     */\n\t    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({\n\t        /**\n\t         * Configuration options.\n\t         *\n\t         * @property {WordArray} iv The IV to use for this operation.\n\t         */\n\t        cfg: Base.extend(),\n\n\t        /**\n\t         * Creates this cipher in encryption mode.\n\t         *\n\t         * @param {WordArray} key The key.\n\t         * @param {Object} cfg (Optional) The configuration options to use for this operation.\n\t         *\n\t         * @return {Cipher} A cipher instance.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });\n\t         */\n\t        createEncryptor: function (key, cfg) {\n\t            return this.create(this._ENC_XFORM_MODE, key, cfg);\n\t        },\n\n\t        /**\n\t         * Creates this cipher in decryption mode.\n\t         *\n\t         * @param {WordArray} key The key.\n\t         * @param {Object} cfg (Optional) The configuration options to use for this operation.\n\t         *\n\t         * @return {Cipher} A cipher instance.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });\n\t         */\n\t        createDecryptor: function (key, cfg) {\n\t            return this.create(this._DEC_XFORM_MODE, key, cfg);\n\t        },\n\n\t        /**\n\t         * Initializes a newly created cipher.\n\t         *\n\t         * @param {number} xformMode Either the encryption or decryption transormation mode constant.\n\t         * @param {WordArray} key The key.\n\t         * @param {Object} cfg (Optional) The configuration options to use for this operation.\n\t         *\n\t         * @example\n\t         *\n\t         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });\n\t         */\n\t        init: function (xformMode, key, cfg) {\n\t            // Apply config defaults\n\t            this.cfg = this.cfg.extend(cfg);\n\n\t            // Store transform mode and key\n\t            this._xformMode = xformMode;\n\t            this._key = key;\n\n\t            // Set initial values\n\t            this.reset();\n\t        },\n\n\t        /**\n\t         * Resets this cipher to its initial state.\n\t         *\n\t         * @example\n\t         *\n\t         *     cipher.reset();\n\t         */\n\t        reset: function () {\n\t            // Reset data buffer\n\t            BufferedBlockAlgorithm.reset.call(this);\n\n\t            // Perform concrete-cipher logic\n\t            this._doReset();\n\t        },\n\n\t        /**\n\t         * Adds data to be encrypted or decrypted.\n\t         *\n\t         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.\n\t         *\n\t         * @return {WordArray} The data after processing.\n\t         *\n\t         * @example\n\t         *\n\t         *     var encrypted = cipher.process('data');\n\t         *     var encrypted = cipher.process(wordArray);\n\t         */\n\t        process: function (dataUpdate) {\n\t            // Append\n\t            this._append(dataUpdate);\n\n\t            // Process available blocks\n\t            return this._process();\n\t        },\n\n\t        /**\n\t         * Finalizes the encryption or decryption process.\n\t         * Note that the finalize operation is effectively a destructive, read-once operation.\n\t         *\n\t         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.\n\t         *\n\t         * @return {WordArray} The data after final processing.\n\t         *\n\t         * @example\n\t         *\n\t         *     var encrypted = cipher.finalize();\n\t         *     var encrypted = cipher.finalize('data');\n\t         *     var encrypted = cipher.finalize(wordArray);\n\t         */\n\t        finalize: function (dataUpdate) {\n\t            // Final data update\n\t            if (dataUpdate) {\n\t                this._append(dataUpdate);\n\t            }\n\n\t            // Perform concrete-cipher logic\n\t            var finalProcessedData = this._doFinalize();\n\n\t            return finalProcessedData;\n\t        },\n\n\t        keySize: 128/32,\n\n\t        ivSize: 128/32,\n\n\t        _ENC_XFORM_MODE: 1,\n\n\t        _DEC_XFORM_MODE: 2,\n\n\t        /**\n\t         * Creates shortcut functions to a cipher's object interface.\n\t         *\n\t         * @param {Cipher} cipher The cipher to create a helper for.\n\t         *\n\t         * @return {Object} An object with encrypt and decrypt shortcut functions.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);\n\t         */\n\t        _createHelper: (function () {\n\t            function selectCipherStrategy(key) {\n\t                if (typeof key == 'string') {\n\t                    return PasswordBasedCipher;\n\t                } else {\n\t                    return SerializableCipher;\n\t                }\n\t            }\n\n\t            return function (cipher) {\n\t                return {\n\t                    encrypt: function (message, key, cfg) {\n\t                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);\n\t                    },\n\n\t                    decrypt: function (ciphertext, key, cfg) {\n\t                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);\n\t                    }\n\t                };\n\t            };\n\t        }())\n\t    });\n\n\t    /**\n\t     * Abstract base stream cipher template.\n\t     *\n\t     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)\n\t     */\n\t    var StreamCipher = C_lib.StreamCipher = Cipher.extend({\n\t        _doFinalize: function () {\n\t            // Process partial blocks\n\t            var finalProcessedBlocks = this._process(!!'flush');\n\n\t            return finalProcessedBlocks;\n\t        },\n\n\t        blockSize: 1\n\t    });\n\n\t    /**\n\t     * Mode namespace.\n\t     */\n\t    var C_mode = C.mode = {};\n\n\t    /**\n\t     * Abstract base block cipher mode template.\n\t     */\n\t    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({\n\t        /**\n\t         * Creates this mode for encryption.\n\t         *\n\t         * @param {Cipher} cipher A block cipher instance.\n\t         * @param {Array} iv The IV words.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);\n\t         */\n\t        createEncryptor: function (cipher, iv) {\n\t            return this.Encryptor.create(cipher, iv);\n\t        },\n\n\t        /**\n\t         * Creates this mode for decryption.\n\t         *\n\t         * @param {Cipher} cipher A block cipher instance.\n\t         * @param {Array} iv The IV words.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);\n\t         */\n\t        createDecryptor: function (cipher, iv) {\n\t            return this.Decryptor.create(cipher, iv);\n\t        },\n\n\t        /**\n\t         * Initializes a newly created mode.\n\t         *\n\t         * @param {Cipher} cipher A block cipher instance.\n\t         * @param {Array} iv The IV words.\n\t         *\n\t         * @example\n\t         *\n\t         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);\n\t         */\n\t        init: function (cipher, iv) {\n\t            this._cipher = cipher;\n\t            this._iv = iv;\n\t        }\n\t    });\n\n\t    /**\n\t     * Cipher Block Chaining mode.\n\t     */\n\t    var CBC = C_mode.CBC = (function () {\n\t        /**\n\t         * Abstract base CBC mode.\n\t         */\n\t        var CBC = BlockCipherMode.extend();\n\n\t        /**\n\t         * CBC encryptor.\n\t         */\n\t        CBC.Encryptor = CBC.extend({\n\t            /**\n\t             * Processes the data block at offset.\n\t             *\n\t             * @param {Array} words The data words to operate on.\n\t             * @param {number} offset The offset where the block starts.\n\t             *\n\t             * @example\n\t             *\n\t             *     mode.processBlock(data.words, offset);\n\t             */\n\t            processBlock: function (words, offset) {\n\t                // Shortcuts\n\t                var cipher = this._cipher;\n\t                var blockSize = cipher.blockSize;\n\n\t                // XOR and encrypt\n\t                xorBlock.call(this, words, offset, blockSize);\n\t                cipher.encryptBlock(words, offset);\n\n\t                // Remember this block to use with next block\n\t                this._prevBlock = words.slice(offset, offset + blockSize);\n\t            }\n\t        });\n\n\t        /**\n\t         * CBC decryptor.\n\t         */\n\t        CBC.Decryptor = CBC.extend({\n\t            /**\n\t             * Processes the data block at offset.\n\t             *\n\t             * @param {Array} words The data words to operate on.\n\t             * @param {number} offset The offset where the block starts.\n\t             *\n\t             * @example\n\t             *\n\t             *     mode.processBlock(data.words, offset);\n\t             */\n\t            processBlock: function (words, offset) {\n\t                // Shortcuts\n\t                var cipher = this._cipher;\n\t                var blockSize = cipher.blockSize;\n\n\t                // Remember this block to use with next block\n\t                var thisBlock = words.slice(offset, offset + blockSize);\n\n\t                // Decrypt and XOR\n\t                cipher.decryptBlock(words, offset);\n\t                xorBlock.call(this, words, offset, blockSize);\n\n\t                // This block becomes the previous block\n\t                this._prevBlock = thisBlock;\n\t            }\n\t        });\n\n\t        function xorBlock(words, offset, blockSize) {\n\t            var block;\n\n\t            // Shortcut\n\t            var iv = this._iv;\n\n\t            // Choose mixing block\n\t            if (iv) {\n\t                block = iv;\n\n\t                // Remove IV for subsequent blocks\n\t                this._iv = undefined;\n\t            } else {\n\t                block = this._prevBlock;\n\t            }\n\n\t            // XOR blocks\n\t            for (var i = 0; i < blockSize; i++) {\n\t                words[offset + i] ^= block[i];\n\t            }\n\t        }\n\n\t        return CBC;\n\t    }());\n\n\t    /**\n\t     * Padding namespace.\n\t     */\n\t    var C_pad = C.pad = {};\n\n\t    /**\n\t     * PKCS #5/7 padding strategy.\n\t     */\n\t    var Pkcs7 = C_pad.Pkcs7 = {\n\t        /**\n\t         * Pads data using the algorithm defined in PKCS #5/7.\n\t         *\n\t         * @param {WordArray} data The data to pad.\n\t         * @param {number} blockSize The multiple that the data should be padded to.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);\n\t         */\n\t        pad: function (data, blockSize) {\n\t            // Shortcut\n\t            var blockSizeBytes = blockSize * 4;\n\n\t            // Count padding bytes\n\t            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;\n\n\t            // Create padding word\n\t            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;\n\n\t            // Create padding\n\t            var paddingWords = [];\n\t            for (var i = 0; i < nPaddingBytes; i += 4) {\n\t                paddingWords.push(paddingWord);\n\t            }\n\t            var padding = WordArray.create(paddingWords, nPaddingBytes);\n\n\t            // Add padding\n\t            data.concat(padding);\n\t        },\n\n\t        /**\n\t         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.\n\t         *\n\t         * @param {WordArray} data The data to unpad.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     CryptoJS.pad.Pkcs7.unpad(wordArray);\n\t         */\n\t        unpad: function (data) {\n\t            // Get number of padding bytes from last byte\n\t            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;\n\n\t            // Remove padding\n\t            data.sigBytes -= nPaddingBytes;\n\t        }\n\t    };\n\n\t    /**\n\t     * Abstract base block cipher template.\n\t     *\n\t     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)\n\t     */\n\t    var BlockCipher = C_lib.BlockCipher = Cipher.extend({\n\t        /**\n\t         * Configuration options.\n\t         *\n\t         * @property {Mode} mode The block mode to use. Default: CBC\n\t         * @property {Padding} padding The padding strategy to use. Default: Pkcs7\n\t         */\n\t        cfg: Cipher.cfg.extend({\n\t            mode: CBC,\n\t            padding: Pkcs7\n\t        }),\n\n\t        reset: function () {\n\t            var modeCreator;\n\n\t            // Reset cipher\n\t            Cipher.reset.call(this);\n\n\t            // Shortcuts\n\t            var cfg = this.cfg;\n\t            var iv = cfg.iv;\n\t            var mode = cfg.mode;\n\n\t            // Reset block mode\n\t            if (this._xformMode == this._ENC_XFORM_MODE) {\n\t                modeCreator = mode.createEncryptor;\n\t            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {\n\t                modeCreator = mode.createDecryptor;\n\t                // Keep at least one block in the buffer for unpadding\n\t                this._minBufferSize = 1;\n\t            }\n\n\t            if (this._mode && this._mode.__creator == modeCreator) {\n\t                this._mode.init(this, iv && iv.words);\n\t            } else {\n\t                this._mode = modeCreator.call(mode, this, iv && iv.words);\n\t                this._mode.__creator = modeCreator;\n\t            }\n\t        },\n\n\t        _doProcessBlock: function (words, offset) {\n\t            this._mode.processBlock(words, offset);\n\t        },\n\n\t        _doFinalize: function () {\n\t            var finalProcessedBlocks;\n\n\t            // Shortcut\n\t            var padding = this.cfg.padding;\n\n\t            // Finalize\n\t            if (this._xformMode == this._ENC_XFORM_MODE) {\n\t                // Pad data\n\t                padding.pad(this._data, this.blockSize);\n\n\t                // Process final blocks\n\t                finalProcessedBlocks = this._process(!!'flush');\n\t            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {\n\t                // Process final blocks\n\t                finalProcessedBlocks = this._process(!!'flush');\n\n\t                // Unpad data\n\t                padding.unpad(finalProcessedBlocks);\n\t            }\n\n\t            return finalProcessedBlocks;\n\t        },\n\n\t        blockSize: 128/32\n\t    });\n\n\t    /**\n\t     * A collection of cipher parameters.\n\t     *\n\t     * @property {WordArray} ciphertext The raw ciphertext.\n\t     * @property {WordArray} key The key to this ciphertext.\n\t     * @property {WordArray} iv The IV used in the ciphering operation.\n\t     * @property {WordArray} salt The salt used with a key derivation function.\n\t     * @property {Cipher} algorithm The cipher algorithm.\n\t     * @property {Mode} mode The block mode used in the ciphering operation.\n\t     * @property {Padding} padding The padding scheme used in the ciphering operation.\n\t     * @property {number} blockSize The block size of the cipher.\n\t     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.\n\t     */\n\t    var CipherParams = C_lib.CipherParams = Base.extend({\n\t        /**\n\t         * Initializes a newly created cipher params object.\n\t         *\n\t         * @param {Object} cipherParams An object with any of the possible cipher parameters.\n\t         *\n\t         * @example\n\t         *\n\t         *     var cipherParams = CryptoJS.lib.CipherParams.create({\n\t         *         ciphertext: ciphertextWordArray,\n\t         *         key: keyWordArray,\n\t         *         iv: ivWordArray,\n\t         *         salt: saltWordArray,\n\t         *         algorithm: CryptoJS.algo.AES,\n\t         *         mode: CryptoJS.mode.CBC,\n\t         *         padding: CryptoJS.pad.PKCS7,\n\t         *         blockSize: 4,\n\t         *         formatter: CryptoJS.format.OpenSSL\n\t         *     });\n\t         */\n\t        init: function (cipherParams) {\n\t            this.mixIn(cipherParams);\n\t        },\n\n\t        /**\n\t         * Converts this cipher params object to a string.\n\t         *\n\t         * @param {Format} formatter (Optional) The formatting strategy to use.\n\t         *\n\t         * @return {string} The stringified cipher params.\n\t         *\n\t         * @throws Error If neither the formatter nor the default formatter is set.\n\t         *\n\t         * @example\n\t         *\n\t         *     var string = cipherParams + '';\n\t         *     var string = cipherParams.toString();\n\t         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);\n\t         */\n\t        toString: function (formatter) {\n\t            return (formatter || this.formatter).stringify(this);\n\t        }\n\t    });\n\n\t    /**\n\t     * Format namespace.\n\t     */\n\t    var C_format = C.format = {};\n\n\t    /**\n\t     * OpenSSL formatting strategy.\n\t     */\n\t    var OpenSSLFormatter = C_format.OpenSSL = {\n\t        /**\n\t         * Converts a cipher params object to an OpenSSL-compatible string.\n\t         *\n\t         * @param {CipherParams} cipherParams The cipher params object.\n\t         *\n\t         * @return {string} The OpenSSL-compatible string.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);\n\t         */\n\t        stringify: function (cipherParams) {\n\t            var wordArray;\n\n\t            // Shortcuts\n\t            var ciphertext = cipherParams.ciphertext;\n\t            var salt = cipherParams.salt;\n\n\t            // Format\n\t            if (salt) {\n\t                wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);\n\t            } else {\n\t                wordArray = ciphertext;\n\t            }\n\n\t            return wordArray.toString(Base64);\n\t        },\n\n\t        /**\n\t         * Converts an OpenSSL-compatible string to a cipher params object.\n\t         *\n\t         * @param {string} openSSLStr The OpenSSL-compatible string.\n\t         *\n\t         * @return {CipherParams} The cipher params object.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);\n\t         */\n\t        parse: function (openSSLStr) {\n\t            var salt;\n\n\t            // Parse base64\n\t            var ciphertext = Base64.parse(openSSLStr);\n\n\t            // Shortcut\n\t            var ciphertextWords = ciphertext.words;\n\n\t            // Test for salt\n\t            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {\n\t                // Extract salt\n\t                salt = WordArray.create(ciphertextWords.slice(2, 4));\n\n\t                // Remove salt from ciphertext\n\t                ciphertextWords.splice(0, 4);\n\t                ciphertext.sigBytes -= 16;\n\t            }\n\n\t            return CipherParams.create({ ciphertext: ciphertext, salt: salt });\n\t        }\n\t    };\n\n\t    /**\n\t     * A cipher wrapper that returns ciphertext as a serializable cipher params object.\n\t     */\n\t    var SerializableCipher = C_lib.SerializableCipher = Base.extend({\n\t        /**\n\t         * Configuration options.\n\t         *\n\t         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL\n\t         */\n\t        cfg: Base.extend({\n\t            format: OpenSSLFormatter\n\t        }),\n\n\t        /**\n\t         * Encrypts a message.\n\t         *\n\t         * @param {Cipher} cipher The cipher algorithm to use.\n\t         * @param {WordArray|string} message The message to encrypt.\n\t         * @param {WordArray} key The key.\n\t         * @param {Object} cfg (Optional) The configuration options to use for this operation.\n\t         *\n\t         * @return {CipherParams} A cipher params object.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);\n\t         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });\n\t         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });\n\t         */\n\t        encrypt: function (cipher, message, key, cfg) {\n\t            // Apply config defaults\n\t            cfg = this.cfg.extend(cfg);\n\n\t            // Encrypt\n\t            var encryptor = cipher.createEncryptor(key, cfg);\n\t            var ciphertext = encryptor.finalize(message);\n\n\t            // Shortcut\n\t            var cipherCfg = encryptor.cfg;\n\n\t            // Create and return serializable cipher params\n\t            return CipherParams.create({\n\t                ciphertext: ciphertext,\n\t                key: key,\n\t                iv: cipherCfg.iv,\n\t                algorithm: cipher,\n\t                mode: cipherCfg.mode,\n\t                padding: cipherCfg.padding,\n\t                blockSize: cipher.blockSize,\n\t                formatter: cfg.format\n\t            });\n\t        },\n\n\t        /**\n\t         * Decrypts serialized ciphertext.\n\t         *\n\t         * @param {Cipher} cipher The cipher algorithm to use.\n\t         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.\n\t         * @param {WordArray} key The key.\n\t         * @param {Object} cfg (Optional) The configuration options to use for this operation.\n\t         *\n\t         * @return {WordArray} The plaintext.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });\n\t         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });\n\t         */\n\t        decrypt: function (cipher, ciphertext, key, cfg) {\n\t            // Apply config defaults\n\t            cfg = this.cfg.extend(cfg);\n\n\t            // Convert string to CipherParams\n\t            ciphertext = this._parse(ciphertext, cfg.format);\n\n\t            // Decrypt\n\t            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);\n\n\t            return plaintext;\n\t        },\n\n\t        /**\n\t         * Converts serialized ciphertext to CipherParams,\n\t         * else assumed CipherParams already and returns ciphertext unchanged.\n\t         *\n\t         * @param {CipherParams|string} ciphertext The ciphertext.\n\t         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.\n\t         *\n\t         * @return {CipherParams} The unserialized ciphertext.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);\n\t         */\n\t        _parse: function (ciphertext, format) {\n\t            if (typeof ciphertext == 'string') {\n\t                return format.parse(ciphertext, this);\n\t            } else {\n\t                return ciphertext;\n\t            }\n\t        }\n\t    });\n\n\t    /**\n\t     * Key derivation function namespace.\n\t     */\n\t    var C_kdf = C.kdf = {};\n\n\t    /**\n\t     * OpenSSL key derivation function.\n\t     */\n\t    var OpenSSLKdf = C_kdf.OpenSSL = {\n\t        /**\n\t         * Derives a key and IV from a password.\n\t         *\n\t         * @param {string} password The password to derive from.\n\t         * @param {number} keySize The size in words of the key to generate.\n\t         * @param {number} ivSize The size in words of the IV to generate.\n\t         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.\n\t         *\n\t         * @return {CipherParams} A cipher params object with the key, IV, and salt.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);\n\t         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');\n\t         */\n\t        execute: function (password, keySize, ivSize, salt) {\n\t            // Generate random salt\n\t            if (!salt) {\n\t                salt = WordArray.random(64/8);\n\t            }\n\n\t            // Derive key and IV\n\t            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);\n\n\t            // Separate key and IV\n\t            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);\n\t            key.sigBytes = keySize * 4;\n\n\t            // Return params\n\t            return CipherParams.create({ key: key, iv: iv, salt: salt });\n\t        }\n\t    };\n\n\t    /**\n\t     * A serializable cipher wrapper that derives the key from a password,\n\t     * and returns ciphertext as a serializable cipher params object.\n\t     */\n\t    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({\n\t        /**\n\t         * Configuration options.\n\t         *\n\t         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL\n\t         */\n\t        cfg: SerializableCipher.cfg.extend({\n\t            kdf: OpenSSLKdf\n\t        }),\n\n\t        /**\n\t         * Encrypts a message using a password.\n\t         *\n\t         * @param {Cipher} cipher The cipher algorithm to use.\n\t         * @param {WordArray|string} message The message to encrypt.\n\t         * @param {string} password The password.\n\t         * @param {Object} cfg (Optional) The configuration options to use for this operation.\n\t         *\n\t         * @return {CipherParams} A cipher params object.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');\n\t         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });\n\t         */\n\t        encrypt: function (cipher, message, password, cfg) {\n\t            // Apply config defaults\n\t            cfg = this.cfg.extend(cfg);\n\n\t            // Derive key and other params\n\t            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);\n\n\t            // Add IV to config\n\t            cfg.iv = derivedParams.iv;\n\n\t            // Encrypt\n\t            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);\n\n\t            // Mix in derived params\n\t            ciphertext.mixIn(derivedParams);\n\n\t            return ciphertext;\n\t        },\n\n\t        /**\n\t         * Decrypts serialized ciphertext using a password.\n\t         *\n\t         * @param {Cipher} cipher The cipher algorithm to use.\n\t         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.\n\t         * @param {string} password The password.\n\t         * @param {Object} cfg (Optional) The configuration options to use for this operation.\n\t         *\n\t         * @return {WordArray} The plaintext.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });\n\t         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });\n\t         */\n\t        decrypt: function (cipher, ciphertext, password, cfg) {\n\t            // Apply config defaults\n\t            cfg = this.cfg.extend(cfg);\n\n\t            // Convert string to CipherParams\n\t            ciphertext = this._parse(ciphertext, cfg.format);\n\n\t            // Derive key and other params\n\t            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);\n\n\t            // Add IV to config\n\t            cfg.iv = derivedParams.iv;\n\n\t            // Decrypt\n\t            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);\n\n\t            return plaintext;\n\t        }\n\t    });\n\t}());\n\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/cipher-core.js?");

/***/ }),

/***/ "./node_modules/crypto-js/core.js":
/*!****************************************!*\
  !*** ./node_modules/crypto-js/core.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory();\n\t}\n\telse {}\n}(this, function () {\n\n\t/*globals window, global, require*/\n\n\t/**\n\t * CryptoJS core components.\n\t */\n\tvar CryptoJS = CryptoJS || (function (Math, undefined) {\n\n\t    var crypto;\n\n\t    // Native crypto from window (Browser)\n\t    if (typeof window !== 'undefined' && window.crypto) {\n\t        crypto = window.crypto;\n\t    }\n\n\t    // Native crypto in web worker (Browser)\n\t    if (typeof self !== 'undefined' && self.crypto) {\n\t        crypto = self.crypto;\n\t    }\n\n\t    // Native crypto from worker\n\t    if (typeof globalThis !== 'undefined' && globalThis.crypto) {\n\t        crypto = globalThis.crypto;\n\t    }\n\n\t    // Native (experimental IE 11) crypto from window (Browser)\n\t    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {\n\t        crypto = window.msCrypto;\n\t    }\n\n\t    // Native crypto from global (NodeJS)\n\t    if (!crypto && typeof __webpack_require__.g !== 'undefined' && __webpack_require__.g.crypto) {\n\t        crypto = __webpack_require__.g.crypto;\n\t    }\n\n\t    // Native crypto import via require (NodeJS)\n\t    if (!crypto && \"function\" === 'function') {\n\t        try {\n\t            crypto = __webpack_require__(/*! crypto */ \"?9157\");\n\t        } catch (err) {}\n\t    }\n\n\t    /*\n\t     * Cryptographically secure pseudorandom number generator\n\t     *\n\t     * As Math.random() is cryptographically not safe to use\n\t     */\n\t    var cryptoSecureRandomInt = function () {\n\t        if (crypto) {\n\t            // Use getRandomValues method (Browser)\n\t            if (typeof crypto.getRandomValues === 'function') {\n\t                try {\n\t                    return crypto.getRandomValues(new Uint32Array(1))[0];\n\t                } catch (err) {}\n\t            }\n\n\t            // Use randomBytes method (NodeJS)\n\t            if (typeof crypto.randomBytes === 'function') {\n\t                try {\n\t                    return crypto.randomBytes(4).readInt32LE();\n\t                } catch (err) {}\n\t            }\n\t        }\n\n\t        throw new Error('Native crypto module could not be used to get secure random number.');\n\t    };\n\n\t    /*\n\t     * Local polyfill of Object.create\n\n\t     */\n\t    var create = Object.create || (function () {\n\t        function F() {}\n\n\t        return function (obj) {\n\t            var subtype;\n\n\t            F.prototype = obj;\n\n\t            subtype = new F();\n\n\t            F.prototype = null;\n\n\t            return subtype;\n\t        };\n\t    }());\n\n\t    /**\n\t     * CryptoJS namespace.\n\t     */\n\t    var C = {};\n\n\t    /**\n\t     * Library namespace.\n\t     */\n\t    var C_lib = C.lib = {};\n\n\t    /**\n\t     * Base object for prototypal inheritance.\n\t     */\n\t    var Base = C_lib.Base = (function () {\n\n\n\t        return {\n\t            /**\n\t             * Creates a new object that inherits from this object.\n\t             *\n\t             * @param {Object} overrides Properties to copy into the new object.\n\t             *\n\t             * @return {Object} The new object.\n\t             *\n\t             * @static\n\t             *\n\t             * @example\n\t             *\n\t             *     var MyType = CryptoJS.lib.Base.extend({\n\t             *         field: 'value',\n\t             *\n\t             *         method: function () {\n\t             *         }\n\t             *     });\n\t             */\n\t            extend: function (overrides) {\n\t                // Spawn\n\t                var subtype = create(this);\n\n\t                // Augment\n\t                if (overrides) {\n\t                    subtype.mixIn(overrides);\n\t                }\n\n\t                // Create default initializer\n\t                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {\n\t                    subtype.init = function () {\n\t                        subtype.$super.init.apply(this, arguments);\n\t                    };\n\t                }\n\n\t                // Initializer's prototype is the subtype object\n\t                subtype.init.prototype = subtype;\n\n\t                // Reference supertype\n\t                subtype.$super = this;\n\n\t                return subtype;\n\t            },\n\n\t            /**\n\t             * Extends this object and runs the init method.\n\t             * Arguments to create() will be passed to init().\n\t             *\n\t             * @return {Object} The new object.\n\t             *\n\t             * @static\n\t             *\n\t             * @example\n\t             *\n\t             *     var instance = MyType.create();\n\t             */\n\t            create: function () {\n\t                var instance = this.extend();\n\t                instance.init.apply(instance, arguments);\n\n\t                return instance;\n\t            },\n\n\t            /**\n\t             * Initializes a newly created object.\n\t             * Override this method to add some logic when your objects are created.\n\t             *\n\t             * @example\n\t             *\n\t             *     var MyType = CryptoJS.lib.Base.extend({\n\t             *         init: function () {\n\t             *             // ...\n\t             *         }\n\t             *     });\n\t             */\n\t            init: function () {\n\t            },\n\n\t            /**\n\t             * Copies properties into this object.\n\t             *\n\t             * @param {Object} properties The properties to mix in.\n\t             *\n\t             * @example\n\t             *\n\t             *     MyType.mixIn({\n\t             *         field: 'value'\n\t             *     });\n\t             */\n\t            mixIn: function (properties) {\n\t                for (var propertyName in properties) {\n\t                    if (properties.hasOwnProperty(propertyName)) {\n\t                        this[propertyName] = properties[propertyName];\n\t                    }\n\t                }\n\n\t                // IE won't copy toString using the loop above\n\t                if (properties.hasOwnProperty('toString')) {\n\t                    this.toString = properties.toString;\n\t                }\n\t            },\n\n\t            /**\n\t             * Creates a copy of this object.\n\t             *\n\t             * @return {Object} The clone.\n\t             *\n\t             * @example\n\t             *\n\t             *     var clone = instance.clone();\n\t             */\n\t            clone: function () {\n\t                return this.init.prototype.extend(this);\n\t            }\n\t        };\n\t    }());\n\n\t    /**\n\t     * An array of 32-bit words.\n\t     *\n\t     * @property {Array} words The array of 32-bit words.\n\t     * @property {number} sigBytes The number of significant bytes in this word array.\n\t     */\n\t    var WordArray = C_lib.WordArray = Base.extend({\n\t        /**\n\t         * Initializes a newly created word array.\n\t         *\n\t         * @param {Array} words (Optional) An array of 32-bit words.\n\t         * @param {number} sigBytes (Optional) The number of significant bytes in the words.\n\t         *\n\t         * @example\n\t         *\n\t         *     var wordArray = CryptoJS.lib.WordArray.create();\n\t         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);\n\t         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);\n\t         */\n\t        init: function (words, sigBytes) {\n\t            words = this.words = words || [];\n\n\t            if (sigBytes != undefined) {\n\t                this.sigBytes = sigBytes;\n\t            } else {\n\t                this.sigBytes = words.length * 4;\n\t            }\n\t        },\n\n\t        /**\n\t         * Converts this word array to a string.\n\t         *\n\t         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex\n\t         *\n\t         * @return {string} The stringified word array.\n\t         *\n\t         * @example\n\t         *\n\t         *     var string = wordArray + '';\n\t         *     var string = wordArray.toString();\n\t         *     var string = wordArray.toString(CryptoJS.enc.Utf8);\n\t         */\n\t        toString: function (encoder) {\n\t            return (encoder || Hex).stringify(this);\n\t        },\n\n\t        /**\n\t         * Concatenates a word array to this word array.\n\t         *\n\t         * @param {WordArray} wordArray The word array to append.\n\t         *\n\t         * @return {WordArray} This word array.\n\t         *\n\t         * @example\n\t         *\n\t         *     wordArray1.concat(wordArray2);\n\t         */\n\t        concat: function (wordArray) {\n\t            // Shortcuts\n\t            var thisWords = this.words;\n\t            var thatWords = wordArray.words;\n\t            var thisSigBytes = this.sigBytes;\n\t            var thatSigBytes = wordArray.sigBytes;\n\n\t            // Clamp excess bits\n\t            this.clamp();\n\n\t            // Concat\n\t            if (thisSigBytes % 4) {\n\t                // Copy one byte at a time\n\t                for (var i = 0; i < thatSigBytes; i++) {\n\t                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;\n\t                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);\n\t                }\n\t            } else {\n\t                // Copy one word at a time\n\t                for (var j = 0; j < thatSigBytes; j += 4) {\n\t                    thisWords[(thisSigBytes + j) >>> 2] = thatWords[j >>> 2];\n\t                }\n\t            }\n\t            this.sigBytes += thatSigBytes;\n\n\t            // Chainable\n\t            return this;\n\t        },\n\n\t        /**\n\t         * Removes insignificant bits.\n\t         *\n\t         * @example\n\t         *\n\t         *     wordArray.clamp();\n\t         */\n\t        clamp: function () {\n\t            // Shortcuts\n\t            var words = this.words;\n\t            var sigBytes = this.sigBytes;\n\n\t            // Clamp\n\t            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);\n\t            words.length = Math.ceil(sigBytes / 4);\n\t        },\n\n\t        /**\n\t         * Creates a copy of this word array.\n\t         *\n\t         * @return {WordArray} The clone.\n\t         *\n\t         * @example\n\t         *\n\t         *     var clone = wordArray.clone();\n\t         */\n\t        clone: function () {\n\t            var clone = Base.clone.call(this);\n\t            clone.words = this.words.slice(0);\n\n\t            return clone;\n\t        },\n\n\t        /**\n\t         * Creates a word array filled with random bytes.\n\t         *\n\t         * @param {number} nBytes The number of random bytes to generate.\n\t         *\n\t         * @return {WordArray} The random word array.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var wordArray = CryptoJS.lib.WordArray.random(16);\n\t         */\n\t        random: function (nBytes) {\n\t            var words = [];\n\n\t            for (var i = 0; i < nBytes; i += 4) {\n\t                words.push(cryptoSecureRandomInt());\n\t            }\n\n\t            return new WordArray.init(words, nBytes);\n\t        }\n\t    });\n\n\t    /**\n\t     * Encoder namespace.\n\t     */\n\t    var C_enc = C.enc = {};\n\n\t    /**\n\t     * Hex encoding strategy.\n\t     */\n\t    var Hex = C_enc.Hex = {\n\t        /**\n\t         * Converts a word array to a hex string.\n\t         *\n\t         * @param {WordArray} wordArray The word array.\n\t         *\n\t         * @return {string} The hex string.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);\n\t         */\n\t        stringify: function (wordArray) {\n\t            // Shortcuts\n\t            var words = wordArray.words;\n\t            var sigBytes = wordArray.sigBytes;\n\n\t            // Convert\n\t            var hexChars = [];\n\t            for (var i = 0; i < sigBytes; i++) {\n\t                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;\n\t                hexChars.push((bite >>> 4).toString(16));\n\t                hexChars.push((bite & 0x0f).toString(16));\n\t            }\n\n\t            return hexChars.join('');\n\t        },\n\n\t        /**\n\t         * Converts a hex string to a word array.\n\t         *\n\t         * @param {string} hexStr The hex string.\n\t         *\n\t         * @return {WordArray} The word array.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);\n\t         */\n\t        parse: function (hexStr) {\n\t            // Shortcut\n\t            var hexStrLength = hexStr.length;\n\n\t            // Convert\n\t            var words = [];\n\t            for (var i = 0; i < hexStrLength; i += 2) {\n\t                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);\n\t            }\n\n\t            return new WordArray.init(words, hexStrLength / 2);\n\t        }\n\t    };\n\n\t    /**\n\t     * Latin1 encoding strategy.\n\t     */\n\t    var Latin1 = C_enc.Latin1 = {\n\t        /**\n\t         * Converts a word array to a Latin1 string.\n\t         *\n\t         * @param {WordArray} wordArray The word array.\n\t         *\n\t         * @return {string} The Latin1 string.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);\n\t         */\n\t        stringify: function (wordArray) {\n\t            // Shortcuts\n\t            var words = wordArray.words;\n\t            var sigBytes = wordArray.sigBytes;\n\n\t            // Convert\n\t            var latin1Chars = [];\n\t            for (var i = 0; i < sigBytes; i++) {\n\t                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;\n\t                latin1Chars.push(String.fromCharCode(bite));\n\t            }\n\n\t            return latin1Chars.join('');\n\t        },\n\n\t        /**\n\t         * Converts a Latin1 string to a word array.\n\t         *\n\t         * @param {string} latin1Str The Latin1 string.\n\t         *\n\t         * @return {WordArray} The word array.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);\n\t         */\n\t        parse: function (latin1Str) {\n\t            // Shortcut\n\t            var latin1StrLength = latin1Str.length;\n\n\t            // Convert\n\t            var words = [];\n\t            for (var i = 0; i < latin1StrLength; i++) {\n\t                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);\n\t            }\n\n\t            return new WordArray.init(words, latin1StrLength);\n\t        }\n\t    };\n\n\t    /**\n\t     * UTF-8 encoding strategy.\n\t     */\n\t    var Utf8 = C_enc.Utf8 = {\n\t        /**\n\t         * Converts a word array to a UTF-8 string.\n\t         *\n\t         * @param {WordArray} wordArray The word array.\n\t         *\n\t         * @return {string} The UTF-8 string.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);\n\t         */\n\t        stringify: function (wordArray) {\n\t            try {\n\t                return decodeURIComponent(escape(Latin1.stringify(wordArray)));\n\t            } catch (e) {\n\t                throw new Error('Malformed UTF-8 data');\n\t            }\n\t        },\n\n\t        /**\n\t         * Converts a UTF-8 string to a word array.\n\t         *\n\t         * @param {string} utf8Str The UTF-8 string.\n\t         *\n\t         * @return {WordArray} The word array.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);\n\t         */\n\t        parse: function (utf8Str) {\n\t            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));\n\t        }\n\t    };\n\n\t    /**\n\t     * Abstract buffered block algorithm template.\n\t     *\n\t     * The property blockSize must be implemented in a concrete subtype.\n\t     *\n\t     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0\n\t     */\n\t    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({\n\t        /**\n\t         * Resets this block algorithm's data buffer to its initial state.\n\t         *\n\t         * @example\n\t         *\n\t         *     bufferedBlockAlgorithm.reset();\n\t         */\n\t        reset: function () {\n\t            // Initial values\n\t            this._data = new WordArray.init();\n\t            this._nDataBytes = 0;\n\t        },\n\n\t        /**\n\t         * Adds new data to this block algorithm's buffer.\n\t         *\n\t         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.\n\t         *\n\t         * @example\n\t         *\n\t         *     bufferedBlockAlgorithm._append('data');\n\t         *     bufferedBlockAlgorithm._append(wordArray);\n\t         */\n\t        _append: function (data) {\n\t            // Convert string to WordArray, else assume WordArray already\n\t            if (typeof data == 'string') {\n\t                data = Utf8.parse(data);\n\t            }\n\n\t            // Append\n\t            this._data.concat(data);\n\t            this._nDataBytes += data.sigBytes;\n\t        },\n\n\t        /**\n\t         * Processes available data blocks.\n\t         *\n\t         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.\n\t         *\n\t         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.\n\t         *\n\t         * @return {WordArray} The processed data.\n\t         *\n\t         * @example\n\t         *\n\t         *     var processedData = bufferedBlockAlgorithm._process();\n\t         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');\n\t         */\n\t        _process: function (doFlush) {\n\t            var processedWords;\n\n\t            // Shortcuts\n\t            var data = this._data;\n\t            var dataWords = data.words;\n\t            var dataSigBytes = data.sigBytes;\n\t            var blockSize = this.blockSize;\n\t            var blockSizeBytes = blockSize * 4;\n\n\t            // Count blocks ready\n\t            var nBlocksReady = dataSigBytes / blockSizeBytes;\n\t            if (doFlush) {\n\t                // Round up to include partial blocks\n\t                nBlocksReady = Math.ceil(nBlocksReady);\n\t            } else {\n\t                // Round down to include only full blocks,\n\t                // less the number of blocks that must remain in the buffer\n\t                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);\n\t            }\n\n\t            // Count words ready\n\t            var nWordsReady = nBlocksReady * blockSize;\n\n\t            // Count bytes ready\n\t            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);\n\n\t            // Process blocks\n\t            if (nWordsReady) {\n\t                for (var offset = 0; offset < nWordsReady; offset += blockSize) {\n\t                    // Perform concrete-algorithm logic\n\t                    this._doProcessBlock(dataWords, offset);\n\t                }\n\n\t                // Remove processed words\n\t                processedWords = dataWords.splice(0, nWordsReady);\n\t                data.sigBytes -= nBytesReady;\n\t            }\n\n\t            // Return processed words\n\t            return new WordArray.init(processedWords, nBytesReady);\n\t        },\n\n\t        /**\n\t         * Creates a copy of this object.\n\t         *\n\t         * @return {Object} The clone.\n\t         *\n\t         * @example\n\t         *\n\t         *     var clone = bufferedBlockAlgorithm.clone();\n\t         */\n\t        clone: function () {\n\t            var clone = Base.clone.call(this);\n\t            clone._data = this._data.clone();\n\n\t            return clone;\n\t        },\n\n\t        _minBufferSize: 0\n\t    });\n\n\t    /**\n\t     * Abstract hasher template.\n\t     *\n\t     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)\n\t     */\n\t    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({\n\t        /**\n\t         * Configuration options.\n\t         */\n\t        cfg: Base.extend(),\n\n\t        /**\n\t         * Initializes a newly created hasher.\n\t         *\n\t         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.\n\t         *\n\t         * @example\n\t         *\n\t         *     var hasher = CryptoJS.algo.SHA256.create();\n\t         */\n\t        init: function (cfg) {\n\t            // Apply config defaults\n\t            this.cfg = this.cfg.extend(cfg);\n\n\t            // Set initial values\n\t            this.reset();\n\t        },\n\n\t        /**\n\t         * Resets this hasher to its initial state.\n\t         *\n\t         * @example\n\t         *\n\t         *     hasher.reset();\n\t         */\n\t        reset: function () {\n\t            // Reset data buffer\n\t            BufferedBlockAlgorithm.reset.call(this);\n\n\t            // Perform concrete-hasher logic\n\t            this._doReset();\n\t        },\n\n\t        /**\n\t         * Updates this hasher with a message.\n\t         *\n\t         * @param {WordArray|string} messageUpdate The message to append.\n\t         *\n\t         * @return {Hasher} This hasher.\n\t         *\n\t         * @example\n\t         *\n\t         *     hasher.update('message');\n\t         *     hasher.update(wordArray);\n\t         */\n\t        update: function (messageUpdate) {\n\t            // Append\n\t            this._append(messageUpdate);\n\n\t            // Update the hash\n\t            this._process();\n\n\t            // Chainable\n\t            return this;\n\t        },\n\n\t        /**\n\t         * Finalizes the hash computation.\n\t         * Note that the finalize operation is effectively a destructive, read-once operation.\n\t         *\n\t         * @param {WordArray|string} messageUpdate (Optional) A final message update.\n\t         *\n\t         * @return {WordArray} The hash.\n\t         *\n\t         * @example\n\t         *\n\t         *     var hash = hasher.finalize();\n\t         *     var hash = hasher.finalize('message');\n\t         *     var hash = hasher.finalize(wordArray);\n\t         */\n\t        finalize: function (messageUpdate) {\n\t            // Final message update\n\t            if (messageUpdate) {\n\t                this._append(messageUpdate);\n\t            }\n\n\t            // Perform concrete-hasher logic\n\t            var hash = this._doFinalize();\n\n\t            return hash;\n\t        },\n\n\t        blockSize: 512/32,\n\n\t        /**\n\t         * Creates a shortcut function to a hasher's object interface.\n\t         *\n\t         * @param {Hasher} hasher The hasher to create a helper for.\n\t         *\n\t         * @return {Function} The shortcut function.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);\n\t         */\n\t        _createHelper: function (hasher) {\n\t            return function (message, cfg) {\n\t                return new hasher.init(cfg).finalize(message);\n\t            };\n\t        },\n\n\t        /**\n\t         * Creates a shortcut function to the HMAC's object interface.\n\t         *\n\t         * @param {Hasher} hasher The hasher to use in this HMAC helper.\n\t         *\n\t         * @return {Function} The shortcut function.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);\n\t         */\n\t        _createHmacHelper: function (hasher) {\n\t            return function (message, key) {\n\t                return new C_algo.HMAC.init(hasher, key).finalize(message);\n\t            };\n\t        }\n\t    });\n\n\t    /**\n\t     * Algorithm namespace.\n\t     */\n\t    var C_algo = C.algo = {};\n\n\t    return C;\n\t}(Math));\n\n\n\treturn CryptoJS;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/core.js?");

/***/ }),

/***/ "./node_modules/crypto-js/enc-base64.js":
/*!**********************************************!*\
  !*** ./node_modules/crypto-js/enc-base64.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function () {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var WordArray = C_lib.WordArray;\n\t    var C_enc = C.enc;\n\n\t    /**\n\t     * Base64 encoding strategy.\n\t     */\n\t    var Base64 = C_enc.Base64 = {\n\t        /**\n\t         * Converts a word array to a Base64 string.\n\t         *\n\t         * @param {WordArray} wordArray The word array.\n\t         *\n\t         * @return {string} The Base64 string.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);\n\t         */\n\t        stringify: function (wordArray) {\n\t            // Shortcuts\n\t            var words = wordArray.words;\n\t            var sigBytes = wordArray.sigBytes;\n\t            var map = this._map;\n\n\t            // Clamp excess bits\n\t            wordArray.clamp();\n\n\t            // Convert\n\t            var base64Chars = [];\n\t            for (var i = 0; i < sigBytes; i += 3) {\n\t                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;\n\t                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;\n\t                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;\n\n\t                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;\n\n\t                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {\n\t                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));\n\t                }\n\t            }\n\n\t            // Add padding\n\t            var paddingChar = map.charAt(64);\n\t            if (paddingChar) {\n\t                while (base64Chars.length % 4) {\n\t                    base64Chars.push(paddingChar);\n\t                }\n\t            }\n\n\t            return base64Chars.join('');\n\t        },\n\n\t        /**\n\t         * Converts a Base64 string to a word array.\n\t         *\n\t         * @param {string} base64Str The Base64 string.\n\t         *\n\t         * @return {WordArray} The word array.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);\n\t         */\n\t        parse: function (base64Str) {\n\t            // Shortcuts\n\t            var base64StrLength = base64Str.length;\n\t            var map = this._map;\n\t            var reverseMap = this._reverseMap;\n\n\t            if (!reverseMap) {\n\t                    reverseMap = this._reverseMap = [];\n\t                    for (var j = 0; j < map.length; j++) {\n\t                        reverseMap[map.charCodeAt(j)] = j;\n\t                    }\n\t            }\n\n\t            // Ignore padding\n\t            var paddingChar = map.charAt(64);\n\t            if (paddingChar) {\n\t                var paddingIndex = base64Str.indexOf(paddingChar);\n\t                if (paddingIndex !== -1) {\n\t                    base64StrLength = paddingIndex;\n\t                }\n\t            }\n\n\t            // Convert\n\t            return parseLoop(base64Str, base64StrLength, reverseMap);\n\n\t        },\n\n\t        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='\n\t    };\n\n\t    function parseLoop(base64Str, base64StrLength, reverseMap) {\n\t      var words = [];\n\t      var nBytes = 0;\n\t      for (var i = 0; i < base64StrLength; i++) {\n\t          if (i % 4) {\n\t              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);\n\t              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);\n\t              var bitsCombined = bits1 | bits2;\n\t              words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);\n\t              nBytes++;\n\t          }\n\t      }\n\t      return WordArray.create(words, nBytes);\n\t    }\n\t}());\n\n\n\treturn CryptoJS.enc.Base64;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/enc-base64.js?");

/***/ }),

/***/ "./node_modules/crypto-js/enc-base64url.js":
/*!*************************************************!*\
  !*** ./node_modules/crypto-js/enc-base64url.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function () {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var WordArray = C_lib.WordArray;\n\t    var C_enc = C.enc;\n\n\t    /**\n\t     * Base64url encoding strategy.\n\t     */\n\t    var Base64url = C_enc.Base64url = {\n\t        /**\n\t         * Converts a word array to a Base64url string.\n\t         *\n\t         * @param {WordArray} wordArray The word array.\n\t         *\n\t         * @param {boolean} urlSafe Whether to use url safe\n\t         *\n\t         * @return {string} The Base64url string.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var base64String = CryptoJS.enc.Base64url.stringify(wordArray);\n\t         */\n\t        stringify: function (wordArray, urlSafe=true) {\n\t            // Shortcuts\n\t            var words = wordArray.words;\n\t            var sigBytes = wordArray.sigBytes;\n\t            var map = urlSafe ? this._safe_map : this._map;\n\n\t            // Clamp excess bits\n\t            wordArray.clamp();\n\n\t            // Convert\n\t            var base64Chars = [];\n\t            for (var i = 0; i < sigBytes; i += 3) {\n\t                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;\n\t                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;\n\t                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;\n\n\t                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;\n\n\t                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {\n\t                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));\n\t                }\n\t            }\n\n\t            // Add padding\n\t            var paddingChar = map.charAt(64);\n\t            if (paddingChar) {\n\t                while (base64Chars.length % 4) {\n\t                    base64Chars.push(paddingChar);\n\t                }\n\t            }\n\n\t            return base64Chars.join('');\n\t        },\n\n\t        /**\n\t         * Converts a Base64url string to a word array.\n\t         *\n\t         * @param {string} base64Str The Base64url string.\n\t         *\n\t         * @param {boolean} urlSafe Whether to use url safe\n\t         *\n\t         * @return {WordArray} The word array.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var wordArray = CryptoJS.enc.Base64url.parse(base64String);\n\t         */\n\t        parse: function (base64Str, urlSafe=true) {\n\t            // Shortcuts\n\t            var base64StrLength = base64Str.length;\n\t            var map = urlSafe ? this._safe_map : this._map;\n\t            var reverseMap = this._reverseMap;\n\n\t            if (!reverseMap) {\n\t                reverseMap = this._reverseMap = [];\n\t                for (var j = 0; j < map.length; j++) {\n\t                    reverseMap[map.charCodeAt(j)] = j;\n\t                }\n\t            }\n\n\t            // Ignore padding\n\t            var paddingChar = map.charAt(64);\n\t            if (paddingChar) {\n\t                var paddingIndex = base64Str.indexOf(paddingChar);\n\t                if (paddingIndex !== -1) {\n\t                    base64StrLength = paddingIndex;\n\t                }\n\t            }\n\n\t            // Convert\n\t            return parseLoop(base64Str, base64StrLength, reverseMap);\n\n\t        },\n\n\t        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',\n\t        _safe_map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',\n\t    };\n\n\t    function parseLoop(base64Str, base64StrLength, reverseMap) {\n\t        var words = [];\n\t        var nBytes = 0;\n\t        for (var i = 0; i < base64StrLength; i++) {\n\t            if (i % 4) {\n\t                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);\n\t                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);\n\t                var bitsCombined = bits1 | bits2;\n\t                words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);\n\t                nBytes++;\n\t            }\n\t        }\n\t        return WordArray.create(words, nBytes);\n\t    }\n\t}());\n\n\treturn CryptoJS.enc.Base64url;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/enc-base64url.js?");

/***/ }),

/***/ "./node_modules/crypto-js/enc-utf16.js":
/*!*********************************************!*\
  !*** ./node_modules/crypto-js/enc-utf16.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function () {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var WordArray = C_lib.WordArray;\n\t    var C_enc = C.enc;\n\n\t    /**\n\t     * UTF-16 BE encoding strategy.\n\t     */\n\t    var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {\n\t        /**\n\t         * Converts a word array to a UTF-16 BE string.\n\t         *\n\t         * @param {WordArray} wordArray The word array.\n\t         *\n\t         * @return {string} The UTF-16 BE string.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);\n\t         */\n\t        stringify: function (wordArray) {\n\t            // Shortcuts\n\t            var words = wordArray.words;\n\t            var sigBytes = wordArray.sigBytes;\n\n\t            // Convert\n\t            var utf16Chars = [];\n\t            for (var i = 0; i < sigBytes; i += 2) {\n\t                var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;\n\t                utf16Chars.push(String.fromCharCode(codePoint));\n\t            }\n\n\t            return utf16Chars.join('');\n\t        },\n\n\t        /**\n\t         * Converts a UTF-16 BE string to a word array.\n\t         *\n\t         * @param {string} utf16Str The UTF-16 BE string.\n\t         *\n\t         * @return {WordArray} The word array.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);\n\t         */\n\t        parse: function (utf16Str) {\n\t            // Shortcut\n\t            var utf16StrLength = utf16Str.length;\n\n\t            // Convert\n\t            var words = [];\n\t            for (var i = 0; i < utf16StrLength; i++) {\n\t                words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);\n\t            }\n\n\t            return WordArray.create(words, utf16StrLength * 2);\n\t        }\n\t    };\n\n\t    /**\n\t     * UTF-16 LE encoding strategy.\n\t     */\n\t    C_enc.Utf16LE = {\n\t        /**\n\t         * Converts a word array to a UTF-16 LE string.\n\t         *\n\t         * @param {WordArray} wordArray The word array.\n\t         *\n\t         * @return {string} The UTF-16 LE string.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);\n\t         */\n\t        stringify: function (wordArray) {\n\t            // Shortcuts\n\t            var words = wordArray.words;\n\t            var sigBytes = wordArray.sigBytes;\n\n\t            // Convert\n\t            var utf16Chars = [];\n\t            for (var i = 0; i < sigBytes; i += 2) {\n\t                var codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);\n\t                utf16Chars.push(String.fromCharCode(codePoint));\n\t            }\n\n\t            return utf16Chars.join('');\n\t        },\n\n\t        /**\n\t         * Converts a UTF-16 LE string to a word array.\n\t         *\n\t         * @param {string} utf16Str The UTF-16 LE string.\n\t         *\n\t         * @return {WordArray} The word array.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);\n\t         */\n\t        parse: function (utf16Str) {\n\t            // Shortcut\n\t            var utf16StrLength = utf16Str.length;\n\n\t            // Convert\n\t            var words = [];\n\t            for (var i = 0; i < utf16StrLength; i++) {\n\t                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));\n\t            }\n\n\t            return WordArray.create(words, utf16StrLength * 2);\n\t        }\n\t    };\n\n\t    function swapEndian(word) {\n\t        return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);\n\t    }\n\t}());\n\n\n\treturn CryptoJS.enc.Utf16;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/enc-utf16.js?");

/***/ }),

/***/ "./node_modules/crypto-js/evpkdf.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/evpkdf.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./sha1 */ \"./node_modules/crypto-js/sha1.js\"), __webpack_require__(/*! ./hmac */ \"./node_modules/crypto-js/hmac.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function () {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var Base = C_lib.Base;\n\t    var WordArray = C_lib.WordArray;\n\t    var C_algo = C.algo;\n\t    var MD5 = C_algo.MD5;\n\n\t    /**\n\t     * This key derivation function is meant to conform with EVP_BytesToKey.\n\t     * www.openssl.org/docs/crypto/EVP_BytesToKey.html\n\t     */\n\t    var EvpKDF = C_algo.EvpKDF = Base.extend({\n\t        /**\n\t         * Configuration options.\n\t         *\n\t         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)\n\t         * @property {Hasher} hasher The hash algorithm to use. Default: MD5\n\t         * @property {number} iterations The number of iterations to perform. Default: 1\n\t         */\n\t        cfg: Base.extend({\n\t            keySize: 128/32,\n\t            hasher: MD5,\n\t            iterations: 1\n\t        }),\n\n\t        /**\n\t         * Initializes a newly created key derivation function.\n\t         *\n\t         * @param {Object} cfg (Optional) The configuration options to use for the derivation.\n\t         *\n\t         * @example\n\t         *\n\t         *     var kdf = CryptoJS.algo.EvpKDF.create();\n\t         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });\n\t         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });\n\t         */\n\t        init: function (cfg) {\n\t            this.cfg = this.cfg.extend(cfg);\n\t        },\n\n\t        /**\n\t         * Derives a key from a password.\n\t         *\n\t         * @param {WordArray|string} password The password.\n\t         * @param {WordArray|string} salt A salt.\n\t         *\n\t         * @return {WordArray} The derived key.\n\t         *\n\t         * @example\n\t         *\n\t         *     var key = kdf.compute(password, salt);\n\t         */\n\t        compute: function (password, salt) {\n\t            var block;\n\n\t            // Shortcut\n\t            var cfg = this.cfg;\n\n\t            // Init hasher\n\t            var hasher = cfg.hasher.create();\n\n\t            // Initial values\n\t            var derivedKey = WordArray.create();\n\n\t            // Shortcuts\n\t            var derivedKeyWords = derivedKey.words;\n\t            var keySize = cfg.keySize;\n\t            var iterations = cfg.iterations;\n\n\t            // Generate key\n\t            while (derivedKeyWords.length < keySize) {\n\t                if (block) {\n\t                    hasher.update(block);\n\t                }\n\t                block = hasher.update(password).finalize(salt);\n\t                hasher.reset();\n\n\t                // Iterations\n\t                for (var i = 1; i < iterations; i++) {\n\t                    block = hasher.finalize(block);\n\t                    hasher.reset();\n\t                }\n\n\t                derivedKey.concat(block);\n\t            }\n\t            derivedKey.sigBytes = keySize * 4;\n\n\t            return derivedKey;\n\t        }\n\t    });\n\n\t    /**\n\t     * Derives a key from a password.\n\t     *\n\t     * @param {WordArray|string} password The password.\n\t     * @param {WordArray|string} salt A salt.\n\t     * @param {Object} cfg (Optional) The configuration options to use for this computation.\n\t     *\n\t     * @return {WordArray} The derived key.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var key = CryptoJS.EvpKDF(password, salt);\n\t     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });\n\t     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });\n\t     */\n\t    C.EvpKDF = function (password, salt, cfg) {\n\t        return EvpKDF.create(cfg).compute(password, salt);\n\t    };\n\t}());\n\n\n\treturn CryptoJS.EvpKDF;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/evpkdf.js?");

/***/ }),

/***/ "./node_modules/crypto-js/format-hex.js":
/*!**********************************************!*\
  !*** ./node_modules/crypto-js/format-hex.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./cipher-core */ \"./node_modules/crypto-js/cipher-core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function (undefined) {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var CipherParams = C_lib.CipherParams;\n\t    var C_enc = C.enc;\n\t    var Hex = C_enc.Hex;\n\t    var C_format = C.format;\n\n\t    var HexFormatter = C_format.Hex = {\n\t        /**\n\t         * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.\n\t         *\n\t         * @param {CipherParams} cipherParams The cipher params object.\n\t         *\n\t         * @return {string} The hexadecimally encoded string.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);\n\t         */\n\t        stringify: function (cipherParams) {\n\t            return cipherParams.ciphertext.toString(Hex);\n\t        },\n\n\t        /**\n\t         * Converts a hexadecimally encoded ciphertext string to a cipher params object.\n\t         *\n\t         * @param {string} input The hexadecimally encoded string.\n\t         *\n\t         * @return {CipherParams} The cipher params object.\n\t         *\n\t         * @static\n\t         *\n\t         * @example\n\t         *\n\t         *     var cipherParams = CryptoJS.format.Hex.parse(hexString);\n\t         */\n\t        parse: function (input) {\n\t            var ciphertext = Hex.parse(input);\n\t            return CipherParams.create({ ciphertext: ciphertext });\n\t        }\n\t    };\n\t}());\n\n\n\treturn CryptoJS.format.Hex;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/format-hex.js?");

/***/ }),

/***/ "./node_modules/crypto-js/hmac.js":
/*!****************************************!*\
  !*** ./node_modules/crypto-js/hmac.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function () {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var Base = C_lib.Base;\n\t    var C_enc = C.enc;\n\t    var Utf8 = C_enc.Utf8;\n\t    var C_algo = C.algo;\n\n\t    /**\n\t     * HMAC algorithm.\n\t     */\n\t    var HMAC = C_algo.HMAC = Base.extend({\n\t        /**\n\t         * Initializes a newly created HMAC.\n\t         *\n\t         * @param {Hasher} hasher The hash algorithm to use.\n\t         * @param {WordArray|string} key The secret key.\n\t         *\n\t         * @example\n\t         *\n\t         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);\n\t         */\n\t        init: function (hasher, key) {\n\t            // Init hasher\n\t            hasher = this._hasher = new hasher.init();\n\n\t            // Convert string to WordArray, else assume WordArray already\n\t            if (typeof key == 'string') {\n\t                key = Utf8.parse(key);\n\t            }\n\n\t            // Shortcuts\n\t            var hasherBlockSize = hasher.blockSize;\n\t            var hasherBlockSizeBytes = hasherBlockSize * 4;\n\n\t            // Allow arbitrary length keys\n\t            if (key.sigBytes > hasherBlockSizeBytes) {\n\t                key = hasher.finalize(key);\n\t            }\n\n\t            // Clamp excess bits\n\t            key.clamp();\n\n\t            // Clone key for inner and outer pads\n\t            var oKey = this._oKey = key.clone();\n\t            var iKey = this._iKey = key.clone();\n\n\t            // Shortcuts\n\t            var oKeyWords = oKey.words;\n\t            var iKeyWords = iKey.words;\n\n\t            // XOR keys with pad constants\n\t            for (var i = 0; i < hasherBlockSize; i++) {\n\t                oKeyWords[i] ^= 0x5c5c5c5c;\n\t                iKeyWords[i] ^= 0x36363636;\n\t            }\n\t            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;\n\n\t            // Set initial values\n\t            this.reset();\n\t        },\n\n\t        /**\n\t         * Resets this HMAC to its initial state.\n\t         *\n\t         * @example\n\t         *\n\t         *     hmacHasher.reset();\n\t         */\n\t        reset: function () {\n\t            // Shortcut\n\t            var hasher = this._hasher;\n\n\t            // Reset\n\t            hasher.reset();\n\t            hasher.update(this._iKey);\n\t        },\n\n\t        /**\n\t         * Updates this HMAC with a message.\n\t         *\n\t         * @param {WordArray|string} messageUpdate The message to append.\n\t         *\n\t         * @return {HMAC} This HMAC instance.\n\t         *\n\t         * @example\n\t         *\n\t         *     hmacHasher.update('message');\n\t         *     hmacHasher.update(wordArray);\n\t         */\n\t        update: function (messageUpdate) {\n\t            this._hasher.update(messageUpdate);\n\n\t            // Chainable\n\t            return this;\n\t        },\n\n\t        /**\n\t         * Finalizes the HMAC computation.\n\t         * Note that the finalize operation is effectively a destructive, read-once operation.\n\t         *\n\t         * @param {WordArray|string} messageUpdate (Optional) A final message update.\n\t         *\n\t         * @return {WordArray} The HMAC.\n\t         *\n\t         * @example\n\t         *\n\t         *     var hmac = hmacHasher.finalize();\n\t         *     var hmac = hmacHasher.finalize('message');\n\t         *     var hmac = hmacHasher.finalize(wordArray);\n\t         */\n\t        finalize: function (messageUpdate) {\n\t            // Shortcut\n\t            var hasher = this._hasher;\n\n\t            // Compute HMAC\n\t            var innerHash = hasher.finalize(messageUpdate);\n\t            hasher.reset();\n\t            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));\n\n\t            return hmac;\n\t        }\n\t    });\n\t}());\n\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/hmac.js?");

/***/ }),

/***/ "./node_modules/crypto-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/crypto-js/index.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./x64-core */ \"./node_modules/crypto-js/x64-core.js\"), __webpack_require__(/*! ./lib-typedarrays */ \"./node_modules/crypto-js/lib-typedarrays.js\"), __webpack_require__(/*! ./enc-utf16 */ \"./node_modules/crypto-js/enc-utf16.js\"), __webpack_require__(/*! ./enc-base64 */ \"./node_modules/crypto-js/enc-base64.js\"), __webpack_require__(/*! ./enc-base64url */ \"./node_modules/crypto-js/enc-base64url.js\"), __webpack_require__(/*! ./md5 */ \"./node_modules/crypto-js/md5.js\"), __webpack_require__(/*! ./sha1 */ \"./node_modules/crypto-js/sha1.js\"), __webpack_require__(/*! ./sha256 */ \"./node_modules/crypto-js/sha256.js\"), __webpack_require__(/*! ./sha224 */ \"./node_modules/crypto-js/sha224.js\"), __webpack_require__(/*! ./sha512 */ \"./node_modules/crypto-js/sha512.js\"), __webpack_require__(/*! ./sha384 */ \"./node_modules/crypto-js/sha384.js\"), __webpack_require__(/*! ./sha3 */ \"./node_modules/crypto-js/sha3.js\"), __webpack_require__(/*! ./ripemd160 */ \"./node_modules/crypto-js/ripemd160.js\"), __webpack_require__(/*! ./hmac */ \"./node_modules/crypto-js/hmac.js\"), __webpack_require__(/*! ./pbkdf2 */ \"./node_modules/crypto-js/pbkdf2.js\"), __webpack_require__(/*! ./evpkdf */ \"./node_modules/crypto-js/evpkdf.js\"), __webpack_require__(/*! ./cipher-core */ \"./node_modules/crypto-js/cipher-core.js\"), __webpack_require__(/*! ./mode-cfb */ \"./node_modules/crypto-js/mode-cfb.js\"), __webpack_require__(/*! ./mode-ctr */ \"./node_modules/crypto-js/mode-ctr.js\"), __webpack_require__(/*! ./mode-ctr-gladman */ \"./node_modules/crypto-js/mode-ctr-gladman.js\"), __webpack_require__(/*! ./mode-ofb */ \"./node_modules/crypto-js/mode-ofb.js\"), __webpack_require__(/*! ./mode-ecb */ \"./node_modules/crypto-js/mode-ecb.js\"), __webpack_require__(/*! ./pad-ansix923 */ \"./node_modules/crypto-js/pad-ansix923.js\"), __webpack_require__(/*! ./pad-iso10126 */ \"./node_modules/crypto-js/pad-iso10126.js\"), __webpack_require__(/*! ./pad-iso97971 */ \"./node_modules/crypto-js/pad-iso97971.js\"), __webpack_require__(/*! ./pad-zeropadding */ \"./node_modules/crypto-js/pad-zeropadding.js\"), __webpack_require__(/*! ./pad-nopadding */ \"./node_modules/crypto-js/pad-nopadding.js\"), __webpack_require__(/*! ./format-hex */ \"./node_modules/crypto-js/format-hex.js\"), __webpack_require__(/*! ./aes */ \"./node_modules/crypto-js/aes.js\"), __webpack_require__(/*! ./tripledes */ \"./node_modules/crypto-js/tripledes.js\"), __webpack_require__(/*! ./rc4 */ \"./node_modules/crypto-js/rc4.js\"), __webpack_require__(/*! ./rabbit */ \"./node_modules/crypto-js/rabbit.js\"), __webpack_require__(/*! ./rabbit-legacy */ \"./node_modules/crypto-js/rabbit-legacy.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\treturn CryptoJS;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/index.js?");

/***/ }),

/***/ "./node_modules/crypto-js/lib-typedarrays.js":
/*!***************************************************!*\
  !*** ./node_modules/crypto-js/lib-typedarrays.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function () {\n\t    // Check if typed arrays are supported\n\t    if (typeof ArrayBuffer != 'function') {\n\t        return;\n\t    }\n\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var WordArray = C_lib.WordArray;\n\n\t    // Reference original init\n\t    var superInit = WordArray.init;\n\n\t    // Augment WordArray.init to handle typed arrays\n\t    var subInit = WordArray.init = function (typedArray) {\n\t        // Convert buffers to uint8\n\t        if (typedArray instanceof ArrayBuffer) {\n\t            typedArray = new Uint8Array(typedArray);\n\t        }\n\n\t        // Convert other array views to uint8\n\t        if (\n\t            typedArray instanceof Int8Array ||\n\t            (typeof Uint8ClampedArray !== \"undefined\" && typedArray instanceof Uint8ClampedArray) ||\n\t            typedArray instanceof Int16Array ||\n\t            typedArray instanceof Uint16Array ||\n\t            typedArray instanceof Int32Array ||\n\t            typedArray instanceof Uint32Array ||\n\t            typedArray instanceof Float32Array ||\n\t            typedArray instanceof Float64Array\n\t        ) {\n\t            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);\n\t        }\n\n\t        // Handle Uint8Array\n\t        if (typedArray instanceof Uint8Array) {\n\t            // Shortcut\n\t            var typedArrayByteLength = typedArray.byteLength;\n\n\t            // Extract bytes\n\t            var words = [];\n\t            for (var i = 0; i < typedArrayByteLength; i++) {\n\t                words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);\n\t            }\n\n\t            // Initialize this word array\n\t            superInit.call(this, words, typedArrayByteLength);\n\t        } else {\n\t            // Else call normal init\n\t            superInit.apply(this, arguments);\n\t        }\n\t    };\n\n\t    subInit.prototype = WordArray;\n\t}());\n\n\n\treturn CryptoJS.lib.WordArray;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/lib-typedarrays.js?");

/***/ }),

/***/ "./node_modules/crypto-js/md5.js":
/*!***************************************!*\
  !*** ./node_modules/crypto-js/md5.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function (Math) {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var WordArray = C_lib.WordArray;\n\t    var Hasher = C_lib.Hasher;\n\t    var C_algo = C.algo;\n\n\t    // Constants table\n\t    var T = [];\n\n\t    // Compute constants\n\t    (function () {\n\t        for (var i = 0; i < 64; i++) {\n\t            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;\n\t        }\n\t    }());\n\n\t    /**\n\t     * MD5 hash algorithm.\n\t     */\n\t    var MD5 = C_algo.MD5 = Hasher.extend({\n\t        _doReset: function () {\n\t            this._hash = new WordArray.init([\n\t                0x67452301, 0xefcdab89,\n\t                0x98badcfe, 0x10325476\n\t            ]);\n\t        },\n\n\t        _doProcessBlock: function (M, offset) {\n\t            // Swap endian\n\t            for (var i = 0; i < 16; i++) {\n\t                // Shortcuts\n\t                var offset_i = offset + i;\n\t                var M_offset_i = M[offset_i];\n\n\t                M[offset_i] = (\n\t                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |\n\t                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)\n\t                );\n\t            }\n\n\t            // Shortcuts\n\t            var H = this._hash.words;\n\n\t            var M_offset_0  = M[offset + 0];\n\t            var M_offset_1  = M[offset + 1];\n\t            var M_offset_2  = M[offset + 2];\n\t            var M_offset_3  = M[offset + 3];\n\t            var M_offset_4  = M[offset + 4];\n\t            var M_offset_5  = M[offset + 5];\n\t            var M_offset_6  = M[offset + 6];\n\t            var M_offset_7  = M[offset + 7];\n\t            var M_offset_8  = M[offset + 8];\n\t            var M_offset_9  = M[offset + 9];\n\t            var M_offset_10 = M[offset + 10];\n\t            var M_offset_11 = M[offset + 11];\n\t            var M_offset_12 = M[offset + 12];\n\t            var M_offset_13 = M[offset + 13];\n\t            var M_offset_14 = M[offset + 14];\n\t            var M_offset_15 = M[offset + 15];\n\n\t            // Working varialbes\n\t            var a = H[0];\n\t            var b = H[1];\n\t            var c = H[2];\n\t            var d = H[3];\n\n\t            // Computation\n\t            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);\n\t            d = FF(d, a, b, c, M_offset_1,  12, T[1]);\n\t            c = FF(c, d, a, b, M_offset_2,  17, T[2]);\n\t            b = FF(b, c, d, a, M_offset_3,  22, T[3]);\n\t            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);\n\t            d = FF(d, a, b, c, M_offset_5,  12, T[5]);\n\t            c = FF(c, d, a, b, M_offset_6,  17, T[6]);\n\t            b = FF(b, c, d, a, M_offset_7,  22, T[7]);\n\t            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);\n\t            d = FF(d, a, b, c, M_offset_9,  12, T[9]);\n\t            c = FF(c, d, a, b, M_offset_10, 17, T[10]);\n\t            b = FF(b, c, d, a, M_offset_11, 22, T[11]);\n\t            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);\n\t            d = FF(d, a, b, c, M_offset_13, 12, T[13]);\n\t            c = FF(c, d, a, b, M_offset_14, 17, T[14]);\n\t            b = FF(b, c, d, a, M_offset_15, 22, T[15]);\n\n\t            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);\n\t            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);\n\t            c = GG(c, d, a, b, M_offset_11, 14, T[18]);\n\t            b = GG(b, c, d, a, M_offset_0,  20, T[19]);\n\t            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);\n\t            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);\n\t            c = GG(c, d, a, b, M_offset_15, 14, T[22]);\n\t            b = GG(b, c, d, a, M_offset_4,  20, T[23]);\n\t            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);\n\t            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);\n\t            c = GG(c, d, a, b, M_offset_3,  14, T[26]);\n\t            b = GG(b, c, d, a, M_offset_8,  20, T[27]);\n\t            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);\n\t            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);\n\t            c = GG(c, d, a, b, M_offset_7,  14, T[30]);\n\t            b = GG(b, c, d, a, M_offset_12, 20, T[31]);\n\n\t            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);\n\t            d = HH(d, a, b, c, M_offset_8,  11, T[33]);\n\t            c = HH(c, d, a, b, M_offset_11, 16, T[34]);\n\t            b = HH(b, c, d, a, M_offset_14, 23, T[35]);\n\t            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);\n\t            d = HH(d, a, b, c, M_offset_4,  11, T[37]);\n\t            c = HH(c, d, a, b, M_offset_7,  16, T[38]);\n\t            b = HH(b, c, d, a, M_offset_10, 23, T[39]);\n\t            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);\n\t            d = HH(d, a, b, c, M_offset_0,  11, T[41]);\n\t            c = HH(c, d, a, b, M_offset_3,  16, T[42]);\n\t            b = HH(b, c, d, a, M_offset_6,  23, T[43]);\n\t            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);\n\t            d = HH(d, a, b, c, M_offset_12, 11, T[45]);\n\t            c = HH(c, d, a, b, M_offset_15, 16, T[46]);\n\t            b = HH(b, c, d, a, M_offset_2,  23, T[47]);\n\n\t            a = II(a, b, c, d, M_offset_0,  6,  T[48]);\n\t            d = II(d, a, b, c, M_offset_7,  10, T[49]);\n\t            c = II(c, d, a, b, M_offset_14, 15, T[50]);\n\t            b = II(b, c, d, a, M_offset_5,  21, T[51]);\n\t            a = II(a, b, c, d, M_offset_12, 6,  T[52]);\n\t            d = II(d, a, b, c, M_offset_3,  10, T[53]);\n\t            c = II(c, d, a, b, M_offset_10, 15, T[54]);\n\t            b = II(b, c, d, a, M_offset_1,  21, T[55]);\n\t            a = II(a, b, c, d, M_offset_8,  6,  T[56]);\n\t            d = II(d, a, b, c, M_offset_15, 10, T[57]);\n\t            c = II(c, d, a, b, M_offset_6,  15, T[58]);\n\t            b = II(b, c, d, a, M_offset_13, 21, T[59]);\n\t            a = II(a, b, c, d, M_offset_4,  6,  T[60]);\n\t            d = II(d, a, b, c, M_offset_11, 10, T[61]);\n\t            c = II(c, d, a, b, M_offset_2,  15, T[62]);\n\t            b = II(b, c, d, a, M_offset_9,  21, T[63]);\n\n\t            // Intermediate hash value\n\t            H[0] = (H[0] + a) | 0;\n\t            H[1] = (H[1] + b) | 0;\n\t            H[2] = (H[2] + c) | 0;\n\t            H[3] = (H[3] + d) | 0;\n\t        },\n\n\t        _doFinalize: function () {\n\t            // Shortcuts\n\t            var data = this._data;\n\t            var dataWords = data.words;\n\n\t            var nBitsTotal = this._nDataBytes * 8;\n\t            var nBitsLeft = data.sigBytes * 8;\n\n\t            // Add padding\n\t            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);\n\n\t            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);\n\t            var nBitsTotalL = nBitsTotal;\n\t            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (\n\t                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |\n\t                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)\n\t            );\n\t            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (\n\t                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |\n\t                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)\n\t            );\n\n\t            data.sigBytes = (dataWords.length + 1) * 4;\n\n\t            // Hash final blocks\n\t            this._process();\n\n\t            // Shortcuts\n\t            var hash = this._hash;\n\t            var H = hash.words;\n\n\t            // Swap endian\n\t            for (var i = 0; i < 4; i++) {\n\t                // Shortcut\n\t                var H_i = H[i];\n\n\t                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |\n\t                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);\n\t            }\n\n\t            // Return final computed hash\n\t            return hash;\n\t        },\n\n\t        clone: function () {\n\t            var clone = Hasher.clone.call(this);\n\t            clone._hash = this._hash.clone();\n\n\t            return clone;\n\t        }\n\t    });\n\n\t    function FF(a, b, c, d, x, s, t) {\n\t        var n = a + ((b & c) | (~b & d)) + x + t;\n\t        return ((n << s) | (n >>> (32 - s))) + b;\n\t    }\n\n\t    function GG(a, b, c, d, x, s, t) {\n\t        var n = a + ((b & d) | (c & ~d)) + x + t;\n\t        return ((n << s) | (n >>> (32 - s))) + b;\n\t    }\n\n\t    function HH(a, b, c, d, x, s, t) {\n\t        var n = a + (b ^ c ^ d) + x + t;\n\t        return ((n << s) | (n >>> (32 - s))) + b;\n\t    }\n\n\t    function II(a, b, c, d, x, s, t) {\n\t        var n = a + (c ^ (b | ~d)) + x + t;\n\t        return ((n << s) | (n >>> (32 - s))) + b;\n\t    }\n\n\t    /**\n\t     * Shortcut function to the hasher's object interface.\n\t     *\n\t     * @param {WordArray|string} message The message to hash.\n\t     *\n\t     * @return {WordArray} The hash.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var hash = CryptoJS.MD5('message');\n\t     *     var hash = CryptoJS.MD5(wordArray);\n\t     */\n\t    C.MD5 = Hasher._createHelper(MD5);\n\n\t    /**\n\t     * Shortcut function to the HMAC's object interface.\n\t     *\n\t     * @param {WordArray|string} message The message to hash.\n\t     * @param {WordArray|string} key The secret key.\n\t     *\n\t     * @return {WordArray} The HMAC.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var hmac = CryptoJS.HmacMD5(message, key);\n\t     */\n\t    C.HmacMD5 = Hasher._createHmacHelper(MD5);\n\t}(Math));\n\n\n\treturn CryptoJS.MD5;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/md5.js?");

/***/ }),

/***/ "./node_modules/crypto-js/mode-cfb.js":
/*!********************************************!*\
  !*** ./node_modules/crypto-js/mode-cfb.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./cipher-core */ \"./node_modules/crypto-js/cipher-core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t/**\n\t * Cipher Feedback block mode.\n\t */\n\tCryptoJS.mode.CFB = (function () {\n\t    var CFB = CryptoJS.lib.BlockCipherMode.extend();\n\n\t    CFB.Encryptor = CFB.extend({\n\t        processBlock: function (words, offset) {\n\t            // Shortcuts\n\t            var cipher = this._cipher;\n\t            var blockSize = cipher.blockSize;\n\n\t            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);\n\n\t            // Remember this block to use with next block\n\t            this._prevBlock = words.slice(offset, offset + blockSize);\n\t        }\n\t    });\n\n\t    CFB.Decryptor = CFB.extend({\n\t        processBlock: function (words, offset) {\n\t            // Shortcuts\n\t            var cipher = this._cipher;\n\t            var blockSize = cipher.blockSize;\n\n\t            // Remember this block to use with next block\n\t            var thisBlock = words.slice(offset, offset + blockSize);\n\n\t            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);\n\n\t            // This block becomes the previous block\n\t            this._prevBlock = thisBlock;\n\t        }\n\t    });\n\n\t    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {\n\t        var keystream;\n\n\t        // Shortcut\n\t        var iv = this._iv;\n\n\t        // Generate keystream\n\t        if (iv) {\n\t            keystream = iv.slice(0);\n\n\t            // Remove IV for subsequent blocks\n\t            this._iv = undefined;\n\t        } else {\n\t            keystream = this._prevBlock;\n\t        }\n\t        cipher.encryptBlock(keystream, 0);\n\n\t        // Encrypt\n\t        for (var i = 0; i < blockSize; i++) {\n\t            words[offset + i] ^= keystream[i];\n\t        }\n\t    }\n\n\t    return CFB;\n\t}());\n\n\n\treturn CryptoJS.mode.CFB;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/mode-cfb.js?");

/***/ }),

/***/ "./node_modules/crypto-js/mode-ctr-gladman.js":
/*!****************************************************!*\
  !*** ./node_modules/crypto-js/mode-ctr-gladman.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./cipher-core */ \"./node_modules/crypto-js/cipher-core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t/** @preserve\n\t * Counter block mode compatible with  Dr Brian Gladman fileenc.c\n\t * derived from CryptoJS.mode.CTR\n\t * Jan Hruby jhruby.web@gmail.com\n\t */\n\tCryptoJS.mode.CTRGladman = (function () {\n\t    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();\n\n\t\tfunction incWord(word)\n\t\t{\n\t\t\tif (((word >> 24) & 0xff) === 0xff) { //overflow\n\t\t\tvar b1 = (word >> 16)&0xff;\n\t\t\tvar b2 = (word >> 8)&0xff;\n\t\t\tvar b3 = word & 0xff;\n\n\t\t\tif (b1 === 0xff) // overflow b1\n\t\t\t{\n\t\t\tb1 = 0;\n\t\t\tif (b2 === 0xff)\n\t\t\t{\n\t\t\t\tb2 = 0;\n\t\t\t\tif (b3 === 0xff)\n\t\t\t\t{\n\t\t\t\t\tb3 = 0;\n\t\t\t\t}\n\t\t\t\telse\n\t\t\t\t{\n\t\t\t\t\t++b3;\n\t\t\t\t}\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\t++b2;\n\t\t\t}\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t++b1;\n\t\t\t}\n\n\t\t\tword = 0;\n\t\t\tword += (b1 << 16);\n\t\t\tword += (b2 << 8);\n\t\t\tword += b3;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\tword += (0x01 << 24);\n\t\t\t}\n\t\t\treturn word;\n\t\t}\n\n\t\tfunction incCounter(counter)\n\t\t{\n\t\t\tif ((counter[0] = incWord(counter[0])) === 0)\n\t\t\t{\n\t\t\t\t// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8\n\t\t\t\tcounter[1] = incWord(counter[1]);\n\t\t\t}\n\t\t\treturn counter;\n\t\t}\n\n\t    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({\n\t        processBlock: function (words, offset) {\n\t            // Shortcuts\n\t            var cipher = this._cipher\n\t            var blockSize = cipher.blockSize;\n\t            var iv = this._iv;\n\t            var counter = this._counter;\n\n\t            // Generate keystream\n\t            if (iv) {\n\t                counter = this._counter = iv.slice(0);\n\n\t                // Remove IV for subsequent blocks\n\t                this._iv = undefined;\n\t            }\n\n\t\t\t\tincCounter(counter);\n\n\t\t\t\tvar keystream = counter.slice(0);\n\t            cipher.encryptBlock(keystream, 0);\n\n\t            // Encrypt\n\t            for (var i = 0; i < blockSize; i++) {\n\t                words[offset + i] ^= keystream[i];\n\t            }\n\t        }\n\t    });\n\n\t    CTRGladman.Decryptor = Encryptor;\n\n\t    return CTRGladman;\n\t}());\n\n\n\n\n\treturn CryptoJS.mode.CTRGladman;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/mode-ctr-gladman.js?");

/***/ }),

/***/ "./node_modules/crypto-js/mode-ctr.js":
/*!********************************************!*\
  !*** ./node_modules/crypto-js/mode-ctr.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./cipher-core */ \"./node_modules/crypto-js/cipher-core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t/**\n\t * Counter block mode.\n\t */\n\tCryptoJS.mode.CTR = (function () {\n\t    var CTR = CryptoJS.lib.BlockCipherMode.extend();\n\n\t    var Encryptor = CTR.Encryptor = CTR.extend({\n\t        processBlock: function (words, offset) {\n\t            // Shortcuts\n\t            var cipher = this._cipher\n\t            var blockSize = cipher.blockSize;\n\t            var iv = this._iv;\n\t            var counter = this._counter;\n\n\t            // Generate keystream\n\t            if (iv) {\n\t                counter = this._counter = iv.slice(0);\n\n\t                // Remove IV for subsequent blocks\n\t                this._iv = undefined;\n\t            }\n\t            var keystream = counter.slice(0);\n\t            cipher.encryptBlock(keystream, 0);\n\n\t            // Increment counter\n\t            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0\n\n\t            // Encrypt\n\t            for (var i = 0; i < blockSize; i++) {\n\t                words[offset + i] ^= keystream[i];\n\t            }\n\t        }\n\t    });\n\n\t    CTR.Decryptor = Encryptor;\n\n\t    return CTR;\n\t}());\n\n\n\treturn CryptoJS.mode.CTR;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/mode-ctr.js?");

/***/ }),

/***/ "./node_modules/crypto-js/mode-ecb.js":
/*!********************************************!*\
  !*** ./node_modules/crypto-js/mode-ecb.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./cipher-core */ \"./node_modules/crypto-js/cipher-core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t/**\n\t * Electronic Codebook block mode.\n\t */\n\tCryptoJS.mode.ECB = (function () {\n\t    var ECB = CryptoJS.lib.BlockCipherMode.extend();\n\n\t    ECB.Encryptor = ECB.extend({\n\t        processBlock: function (words, offset) {\n\t            this._cipher.encryptBlock(words, offset);\n\t        }\n\t    });\n\n\t    ECB.Decryptor = ECB.extend({\n\t        processBlock: function (words, offset) {\n\t            this._cipher.decryptBlock(words, offset);\n\t        }\n\t    });\n\n\t    return ECB;\n\t}());\n\n\n\treturn CryptoJS.mode.ECB;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/mode-ecb.js?");

/***/ }),

/***/ "./node_modules/crypto-js/mode-ofb.js":
/*!********************************************!*\
  !*** ./node_modules/crypto-js/mode-ofb.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./cipher-core */ \"./node_modules/crypto-js/cipher-core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t/**\n\t * Output Feedback block mode.\n\t */\n\tCryptoJS.mode.OFB = (function () {\n\t    var OFB = CryptoJS.lib.BlockCipherMode.extend();\n\n\t    var Encryptor = OFB.Encryptor = OFB.extend({\n\t        processBlock: function (words, offset) {\n\t            // Shortcuts\n\t            var cipher = this._cipher\n\t            var blockSize = cipher.blockSize;\n\t            var iv = this._iv;\n\t            var keystream = this._keystream;\n\n\t            // Generate keystream\n\t            if (iv) {\n\t                keystream = this._keystream = iv.slice(0);\n\n\t                // Remove IV for subsequent blocks\n\t                this._iv = undefined;\n\t            }\n\t            cipher.encryptBlock(keystream, 0);\n\n\t            // Encrypt\n\t            for (var i = 0; i < blockSize; i++) {\n\t                words[offset + i] ^= keystream[i];\n\t            }\n\t        }\n\t    });\n\n\t    OFB.Decryptor = Encryptor;\n\n\t    return OFB;\n\t}());\n\n\n\treturn CryptoJS.mode.OFB;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/mode-ofb.js?");

/***/ }),

/***/ "./node_modules/crypto-js/pad-ansix923.js":
/*!************************************************!*\
  !*** ./node_modules/crypto-js/pad-ansix923.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./cipher-core */ \"./node_modules/crypto-js/cipher-core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t/**\n\t * ANSI X.923 padding strategy.\n\t */\n\tCryptoJS.pad.AnsiX923 = {\n\t    pad: function (data, blockSize) {\n\t        // Shortcuts\n\t        var dataSigBytes = data.sigBytes;\n\t        var blockSizeBytes = blockSize * 4;\n\n\t        // Count padding bytes\n\t        var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;\n\n\t        // Compute last byte position\n\t        var lastBytePos = dataSigBytes + nPaddingBytes - 1;\n\n\t        // Pad\n\t        data.clamp();\n\t        data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);\n\t        data.sigBytes += nPaddingBytes;\n\t    },\n\n\t    unpad: function (data) {\n\t        // Get number of padding bytes from last byte\n\t        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;\n\n\t        // Remove padding\n\t        data.sigBytes -= nPaddingBytes;\n\t    }\n\t};\n\n\n\treturn CryptoJS.pad.Ansix923;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/pad-ansix923.js?");

/***/ }),

/***/ "./node_modules/crypto-js/pad-iso10126.js":
/*!************************************************!*\
  !*** ./node_modules/crypto-js/pad-iso10126.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./cipher-core */ \"./node_modules/crypto-js/cipher-core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t/**\n\t * ISO 10126 padding strategy.\n\t */\n\tCryptoJS.pad.Iso10126 = {\n\t    pad: function (data, blockSize) {\n\t        // Shortcut\n\t        var blockSizeBytes = blockSize * 4;\n\n\t        // Count padding bytes\n\t        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;\n\n\t        // Pad\n\t        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).\n\t             concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));\n\t    },\n\n\t    unpad: function (data) {\n\t        // Get number of padding bytes from last byte\n\t        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;\n\n\t        // Remove padding\n\t        data.sigBytes -= nPaddingBytes;\n\t    }\n\t};\n\n\n\treturn CryptoJS.pad.Iso10126;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/pad-iso10126.js?");

/***/ }),

/***/ "./node_modules/crypto-js/pad-iso97971.js":
/*!************************************************!*\
  !*** ./node_modules/crypto-js/pad-iso97971.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./cipher-core */ \"./node_modules/crypto-js/cipher-core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t/**\n\t * ISO/IEC 9797-1 Padding Method 2.\n\t */\n\tCryptoJS.pad.Iso97971 = {\n\t    pad: function (data, blockSize) {\n\t        // Add 0x80 byte\n\t        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));\n\n\t        // Zero pad the rest\n\t        CryptoJS.pad.ZeroPadding.pad(data, blockSize);\n\t    },\n\n\t    unpad: function (data) {\n\t        // Remove zero padding\n\t        CryptoJS.pad.ZeroPadding.unpad(data);\n\n\t        // Remove one more byte -- the 0x80 byte\n\t        data.sigBytes--;\n\t    }\n\t};\n\n\n\treturn CryptoJS.pad.Iso97971;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/pad-iso97971.js?");

/***/ }),

/***/ "./node_modules/crypto-js/pad-nopadding.js":
/*!*************************************************!*\
  !*** ./node_modules/crypto-js/pad-nopadding.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./cipher-core */ \"./node_modules/crypto-js/cipher-core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t/**\n\t * A noop padding strategy.\n\t */\n\tCryptoJS.pad.NoPadding = {\n\t    pad: function () {\n\t    },\n\n\t    unpad: function () {\n\t    }\n\t};\n\n\n\treturn CryptoJS.pad.NoPadding;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/pad-nopadding.js?");

/***/ }),

/***/ "./node_modules/crypto-js/pad-zeropadding.js":
/*!***************************************************!*\
  !*** ./node_modules/crypto-js/pad-zeropadding.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./cipher-core */ \"./node_modules/crypto-js/cipher-core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t/**\n\t * Zero padding strategy.\n\t */\n\tCryptoJS.pad.ZeroPadding = {\n\t    pad: function (data, blockSize) {\n\t        // Shortcut\n\t        var blockSizeBytes = blockSize * 4;\n\n\t        // Pad\n\t        data.clamp();\n\t        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);\n\t    },\n\n\t    unpad: function (data) {\n\t        // Shortcut\n\t        var dataWords = data.words;\n\n\t        // Unpad\n\t        var i = data.sigBytes - 1;\n\t        for (var i = data.sigBytes - 1; i >= 0; i--) {\n\t            if (((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {\n\t                data.sigBytes = i + 1;\n\t                break;\n\t            }\n\t        }\n\t    }\n\t};\n\n\n\treturn CryptoJS.pad.ZeroPadding;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/pad-zeropadding.js?");

/***/ }),

/***/ "./node_modules/crypto-js/pbkdf2.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/pbkdf2.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./sha1 */ \"./node_modules/crypto-js/sha1.js\"), __webpack_require__(/*! ./hmac */ \"./node_modules/crypto-js/hmac.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function () {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var Base = C_lib.Base;\n\t    var WordArray = C_lib.WordArray;\n\t    var C_algo = C.algo;\n\t    var SHA1 = C_algo.SHA1;\n\t    var HMAC = C_algo.HMAC;\n\n\t    /**\n\t     * Password-Based Key Derivation Function 2 algorithm.\n\t     */\n\t    var PBKDF2 = C_algo.PBKDF2 = Base.extend({\n\t        /**\n\t         * Configuration options.\n\t         *\n\t         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)\n\t         * @property {Hasher} hasher The hasher to use. Default: SHA1\n\t         * @property {number} iterations The number of iterations to perform. Default: 1\n\t         */\n\t        cfg: Base.extend({\n\t            keySize: 128/32,\n\t            hasher: SHA1,\n\t            iterations: 1\n\t        }),\n\n\t        /**\n\t         * Initializes a newly created key derivation function.\n\t         *\n\t         * @param {Object} cfg (Optional) The configuration options to use for the derivation.\n\t         *\n\t         * @example\n\t         *\n\t         *     var kdf = CryptoJS.algo.PBKDF2.create();\n\t         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });\n\t         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });\n\t         */\n\t        init: function (cfg) {\n\t            this.cfg = this.cfg.extend(cfg);\n\t        },\n\n\t        /**\n\t         * Computes the Password-Based Key Derivation Function 2.\n\t         *\n\t         * @param {WordArray|string} password The password.\n\t         * @param {WordArray|string} salt A salt.\n\t         *\n\t         * @return {WordArray} The derived key.\n\t         *\n\t         * @example\n\t         *\n\t         *     var key = kdf.compute(password, salt);\n\t         */\n\t        compute: function (password, salt) {\n\t            // Shortcut\n\t            var cfg = this.cfg;\n\n\t            // Init HMAC\n\t            var hmac = HMAC.create(cfg.hasher, password);\n\n\t            // Initial values\n\t            var derivedKey = WordArray.create();\n\t            var blockIndex = WordArray.create([0x00000001]);\n\n\t            // Shortcuts\n\t            var derivedKeyWords = derivedKey.words;\n\t            var blockIndexWords = blockIndex.words;\n\t            var keySize = cfg.keySize;\n\t            var iterations = cfg.iterations;\n\n\t            // Generate key\n\t            while (derivedKeyWords.length < keySize) {\n\t                var block = hmac.update(salt).finalize(blockIndex);\n\t                hmac.reset();\n\n\t                // Shortcuts\n\t                var blockWords = block.words;\n\t                var blockWordsLength = blockWords.length;\n\n\t                // Iterations\n\t                var intermediate = block;\n\t                for (var i = 1; i < iterations; i++) {\n\t                    intermediate = hmac.finalize(intermediate);\n\t                    hmac.reset();\n\n\t                    // Shortcut\n\t                    var intermediateWords = intermediate.words;\n\n\t                    // XOR intermediate with block\n\t                    for (var j = 0; j < blockWordsLength; j++) {\n\t                        blockWords[j] ^= intermediateWords[j];\n\t                    }\n\t                }\n\n\t                derivedKey.concat(block);\n\t                blockIndexWords[0]++;\n\t            }\n\t            derivedKey.sigBytes = keySize * 4;\n\n\t            return derivedKey;\n\t        }\n\t    });\n\n\t    /**\n\t     * Computes the Password-Based Key Derivation Function 2.\n\t     *\n\t     * @param {WordArray|string} password The password.\n\t     * @param {WordArray|string} salt A salt.\n\t     * @param {Object} cfg (Optional) The configuration options to use for this computation.\n\t     *\n\t     * @return {WordArray} The derived key.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var key = CryptoJS.PBKDF2(password, salt);\n\t     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });\n\t     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });\n\t     */\n\t    C.PBKDF2 = function (password, salt, cfg) {\n\t        return PBKDF2.create(cfg).compute(password, salt);\n\t    };\n\t}());\n\n\n\treturn CryptoJS.PBKDF2;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/pbkdf2.js?");

/***/ }),

/***/ "./node_modules/crypto-js/rabbit-legacy.js":
/*!*************************************************!*\
  !*** ./node_modules/crypto-js/rabbit-legacy.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./enc-base64 */ \"./node_modules/crypto-js/enc-base64.js\"), __webpack_require__(/*! ./md5 */ \"./node_modules/crypto-js/md5.js\"), __webpack_require__(/*! ./evpkdf */ \"./node_modules/crypto-js/evpkdf.js\"), __webpack_require__(/*! ./cipher-core */ \"./node_modules/crypto-js/cipher-core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function () {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var StreamCipher = C_lib.StreamCipher;\n\t    var C_algo = C.algo;\n\n\t    // Reusable objects\n\t    var S  = [];\n\t    var C_ = [];\n\t    var G  = [];\n\n\t    /**\n\t     * Rabbit stream cipher algorithm.\n\t     *\n\t     * This is a legacy version that neglected to convert the key to little-endian.\n\t     * This error doesn't affect the cipher's security,\n\t     * but it does affect its compatibility with other implementations.\n\t     */\n\t    var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({\n\t        _doReset: function () {\n\t            // Shortcuts\n\t            var K = this._key.words;\n\t            var iv = this.cfg.iv;\n\n\t            // Generate initial state values\n\t            var X = this._X = [\n\t                K[0], (K[3] << 16) | (K[2] >>> 16),\n\t                K[1], (K[0] << 16) | (K[3] >>> 16),\n\t                K[2], (K[1] << 16) | (K[0] >>> 16),\n\t                K[3], (K[2] << 16) | (K[1] >>> 16)\n\t            ];\n\n\t            // Generate initial counter values\n\t            var C = this._C = [\n\t                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),\n\t                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),\n\t                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),\n\t                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)\n\t            ];\n\n\t            // Carry bit\n\t            this._b = 0;\n\n\t            // Iterate the system four times\n\t            for (var i = 0; i < 4; i++) {\n\t                nextState.call(this);\n\t            }\n\n\t            // Modify the counters\n\t            for (var i = 0; i < 8; i++) {\n\t                C[i] ^= X[(i + 4) & 7];\n\t            }\n\n\t            // IV setup\n\t            if (iv) {\n\t                // Shortcuts\n\t                var IV = iv.words;\n\t                var IV_0 = IV[0];\n\t                var IV_1 = IV[1];\n\n\t                // Generate four subvectors\n\t                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);\n\t                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);\n\t                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);\n\t                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);\n\n\t                // Modify counter values\n\t                C[0] ^= i0;\n\t                C[1] ^= i1;\n\t                C[2] ^= i2;\n\t                C[3] ^= i3;\n\t                C[4] ^= i0;\n\t                C[5] ^= i1;\n\t                C[6] ^= i2;\n\t                C[7] ^= i3;\n\n\t                // Iterate the system four times\n\t                for (var i = 0; i < 4; i++) {\n\t                    nextState.call(this);\n\t                }\n\t            }\n\t        },\n\n\t        _doProcessBlock: function (M, offset) {\n\t            // Shortcut\n\t            var X = this._X;\n\n\t            // Iterate the system\n\t            nextState.call(this);\n\n\t            // Generate four keystream words\n\t            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);\n\t            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);\n\t            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);\n\t            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);\n\n\t            for (var i = 0; i < 4; i++) {\n\t                // Swap endian\n\t                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |\n\t                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);\n\n\t                // Encrypt\n\t                M[offset + i] ^= S[i];\n\t            }\n\t        },\n\n\t        blockSize: 128/32,\n\n\t        ivSize: 64/32\n\t    });\n\n\t    function nextState() {\n\t        // Shortcuts\n\t        var X = this._X;\n\t        var C = this._C;\n\n\t        // Save old counter values\n\t        for (var i = 0; i < 8; i++) {\n\t            C_[i] = C[i];\n\t        }\n\n\t        // Calculate new counter values\n\t        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;\n\t        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;\n\t        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;\n\t        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;\n\t        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;\n\t        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;\n\t        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;\n\t        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;\n\t        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;\n\n\t        // Calculate the g-values\n\t        for (var i = 0; i < 8; i++) {\n\t            var gx = X[i] + C[i];\n\n\t            // Construct high and low argument for squaring\n\t            var ga = gx & 0xffff;\n\t            var gb = gx >>> 16;\n\n\t            // Calculate high and low result of squaring\n\t            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;\n\t            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);\n\n\t            // High XOR low\n\t            G[i] = gh ^ gl;\n\t        }\n\n\t        // Calculate new state values\n\t        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;\n\t        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;\n\t        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;\n\t        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;\n\t        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;\n\t        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;\n\t        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;\n\t        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;\n\t    }\n\n\t    /**\n\t     * Shortcut functions to the cipher's object interface.\n\t     *\n\t     * @example\n\t     *\n\t     *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);\n\t     *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);\n\t     */\n\t    C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);\n\t}());\n\n\n\treturn CryptoJS.RabbitLegacy;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/rabbit-legacy.js?");

/***/ }),

/***/ "./node_modules/crypto-js/rabbit.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/rabbit.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./enc-base64 */ \"./node_modules/crypto-js/enc-base64.js\"), __webpack_require__(/*! ./md5 */ \"./node_modules/crypto-js/md5.js\"), __webpack_require__(/*! ./evpkdf */ \"./node_modules/crypto-js/evpkdf.js\"), __webpack_require__(/*! ./cipher-core */ \"./node_modules/crypto-js/cipher-core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function () {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var StreamCipher = C_lib.StreamCipher;\n\t    var C_algo = C.algo;\n\n\t    // Reusable objects\n\t    var S  = [];\n\t    var C_ = [];\n\t    var G  = [];\n\n\t    /**\n\t     * Rabbit stream cipher algorithm\n\t     */\n\t    var Rabbit = C_algo.Rabbit = StreamCipher.extend({\n\t        _doReset: function () {\n\t            // Shortcuts\n\t            var K = this._key.words;\n\t            var iv = this.cfg.iv;\n\n\t            // Swap endian\n\t            for (var i = 0; i < 4; i++) {\n\t                K[i] = (((K[i] << 8)  | (K[i] >>> 24)) & 0x00ff00ff) |\n\t                       (((K[i] << 24) | (K[i] >>> 8))  & 0xff00ff00);\n\t            }\n\n\t            // Generate initial state values\n\t            var X = this._X = [\n\t                K[0], (K[3] << 16) | (K[2] >>> 16),\n\t                K[1], (K[0] << 16) | (K[3] >>> 16),\n\t                K[2], (K[1] << 16) | (K[0] >>> 16),\n\t                K[3], (K[2] << 16) | (K[1] >>> 16)\n\t            ];\n\n\t            // Generate initial counter values\n\t            var C = this._C = [\n\t                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),\n\t                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),\n\t                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),\n\t                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)\n\t            ];\n\n\t            // Carry bit\n\t            this._b = 0;\n\n\t            // Iterate the system four times\n\t            for (var i = 0; i < 4; i++) {\n\t                nextState.call(this);\n\t            }\n\n\t            // Modify the counters\n\t            for (var i = 0; i < 8; i++) {\n\t                C[i] ^= X[(i + 4) & 7];\n\t            }\n\n\t            // IV setup\n\t            if (iv) {\n\t                // Shortcuts\n\t                var IV = iv.words;\n\t                var IV_0 = IV[0];\n\t                var IV_1 = IV[1];\n\n\t                // Generate four subvectors\n\t                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);\n\t                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);\n\t                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);\n\t                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);\n\n\t                // Modify counter values\n\t                C[0] ^= i0;\n\t                C[1] ^= i1;\n\t                C[2] ^= i2;\n\t                C[3] ^= i3;\n\t                C[4] ^= i0;\n\t                C[5] ^= i1;\n\t                C[6] ^= i2;\n\t                C[7] ^= i3;\n\n\t                // Iterate the system four times\n\t                for (var i = 0; i < 4; i++) {\n\t                    nextState.call(this);\n\t                }\n\t            }\n\t        },\n\n\t        _doProcessBlock: function (M, offset) {\n\t            // Shortcut\n\t            var X = this._X;\n\n\t            // Iterate the system\n\t            nextState.call(this);\n\n\t            // Generate four keystream words\n\t            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);\n\t            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);\n\t            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);\n\t            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);\n\n\t            for (var i = 0; i < 4; i++) {\n\t                // Swap endian\n\t                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |\n\t                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);\n\n\t                // Encrypt\n\t                M[offset + i] ^= S[i];\n\t            }\n\t        },\n\n\t        blockSize: 128/32,\n\n\t        ivSize: 64/32\n\t    });\n\n\t    function nextState() {\n\t        // Shortcuts\n\t        var X = this._X;\n\t        var C = this._C;\n\n\t        // Save old counter values\n\t        for (var i = 0; i < 8; i++) {\n\t            C_[i] = C[i];\n\t        }\n\n\t        // Calculate new counter values\n\t        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;\n\t        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;\n\t        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;\n\t        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;\n\t        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;\n\t        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;\n\t        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;\n\t        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;\n\t        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;\n\n\t        // Calculate the g-values\n\t        for (var i = 0; i < 8; i++) {\n\t            var gx = X[i] + C[i];\n\n\t            // Construct high and low argument for squaring\n\t            var ga = gx & 0xffff;\n\t            var gb = gx >>> 16;\n\n\t            // Calculate high and low result of squaring\n\t            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;\n\t            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);\n\n\t            // High XOR low\n\t            G[i] = gh ^ gl;\n\t        }\n\n\t        // Calculate new state values\n\t        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;\n\t        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;\n\t        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;\n\t        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;\n\t        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;\n\t        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;\n\t        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;\n\t        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;\n\t    }\n\n\t    /**\n\t     * Shortcut functions to the cipher's object interface.\n\t     *\n\t     * @example\n\t     *\n\t     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);\n\t     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);\n\t     */\n\t    C.Rabbit = StreamCipher._createHelper(Rabbit);\n\t}());\n\n\n\treturn CryptoJS.Rabbit;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/rabbit.js?");

/***/ }),

/***/ "./node_modules/crypto-js/rc4.js":
/*!***************************************!*\
  !*** ./node_modules/crypto-js/rc4.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./enc-base64 */ \"./node_modules/crypto-js/enc-base64.js\"), __webpack_require__(/*! ./md5 */ \"./node_modules/crypto-js/md5.js\"), __webpack_require__(/*! ./evpkdf */ \"./node_modules/crypto-js/evpkdf.js\"), __webpack_require__(/*! ./cipher-core */ \"./node_modules/crypto-js/cipher-core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function () {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var StreamCipher = C_lib.StreamCipher;\n\t    var C_algo = C.algo;\n\n\t    /**\n\t     * RC4 stream cipher algorithm.\n\t     */\n\t    var RC4 = C_algo.RC4 = StreamCipher.extend({\n\t        _doReset: function () {\n\t            // Shortcuts\n\t            var key = this._key;\n\t            var keyWords = key.words;\n\t            var keySigBytes = key.sigBytes;\n\n\t            // Init sbox\n\t            var S = this._S = [];\n\t            for (var i = 0; i < 256; i++) {\n\t                S[i] = i;\n\t            }\n\n\t            // Key setup\n\t            for (var i = 0, j = 0; i < 256; i++) {\n\t                var keyByteIndex = i % keySigBytes;\n\t                var keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;\n\n\t                j = (j + S[i] + keyByte) % 256;\n\n\t                // Swap\n\t                var t = S[i];\n\t                S[i] = S[j];\n\t                S[j] = t;\n\t            }\n\n\t            // Counters\n\t            this._i = this._j = 0;\n\t        },\n\n\t        _doProcessBlock: function (M, offset) {\n\t            M[offset] ^= generateKeystreamWord.call(this);\n\t        },\n\n\t        keySize: 256/32,\n\n\t        ivSize: 0\n\t    });\n\n\t    function generateKeystreamWord() {\n\t        // Shortcuts\n\t        var S = this._S;\n\t        var i = this._i;\n\t        var j = this._j;\n\n\t        // Generate keystream word\n\t        var keystreamWord = 0;\n\t        for (var n = 0; n < 4; n++) {\n\t            i = (i + 1) % 256;\n\t            j = (j + S[i]) % 256;\n\n\t            // Swap\n\t            var t = S[i];\n\t            S[i] = S[j];\n\t            S[j] = t;\n\n\t            keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);\n\t        }\n\n\t        // Update counters\n\t        this._i = i;\n\t        this._j = j;\n\n\t        return keystreamWord;\n\t    }\n\n\t    /**\n\t     * Shortcut functions to the cipher's object interface.\n\t     *\n\t     * @example\n\t     *\n\t     *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);\n\t     *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);\n\t     */\n\t    C.RC4 = StreamCipher._createHelper(RC4);\n\n\t    /**\n\t     * Modified RC4 stream cipher algorithm.\n\t     */\n\t    var RC4Drop = C_algo.RC4Drop = RC4.extend({\n\t        /**\n\t         * Configuration options.\n\t         *\n\t         * @property {number} drop The number of keystream words to drop. Default 192\n\t         */\n\t        cfg: RC4.cfg.extend({\n\t            drop: 192\n\t        }),\n\n\t        _doReset: function () {\n\t            RC4._doReset.call(this);\n\n\t            // Drop\n\t            for (var i = this.cfg.drop; i > 0; i--) {\n\t                generateKeystreamWord.call(this);\n\t            }\n\t        }\n\t    });\n\n\t    /**\n\t     * Shortcut functions to the cipher's object interface.\n\t     *\n\t     * @example\n\t     *\n\t     *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);\n\t     *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);\n\t     */\n\t    C.RC4Drop = StreamCipher._createHelper(RC4Drop);\n\t}());\n\n\n\treturn CryptoJS.RC4;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/rc4.js?");

/***/ }),

/***/ "./node_modules/crypto-js/ripemd160.js":
/*!*********************************************!*\
  !*** ./node_modules/crypto-js/ripemd160.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t/** @preserve\n\t(c) 2012 by Cédric Mesnil. All rights reserved.\n\n\tRedistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:\n\n\t    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.\n\t    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.\n\n\tTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS \"AS IS\" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n\t*/\n\n\t(function (Math) {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var WordArray = C_lib.WordArray;\n\t    var Hasher = C_lib.Hasher;\n\t    var C_algo = C.algo;\n\n\t    // Constants table\n\t    var _zl = WordArray.create([\n\t        0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,\n\t        7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,\n\t        3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,\n\t        1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,\n\t        4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13]);\n\t    var _zr = WordArray.create([\n\t        5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,\n\t        6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,\n\t        15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,\n\t        8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,\n\t        12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11]);\n\t    var _sl = WordArray.create([\n\t         11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,\n\t        7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,\n\t        11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,\n\t          11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,\n\t        9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ]);\n\t    var _sr = WordArray.create([\n\t        8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,\n\t        9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,\n\t        9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,\n\t        15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,\n\t        8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ]);\n\n\t    var _hl =  WordArray.create([ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);\n\t    var _hr =  WordArray.create([ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);\n\n\t    /**\n\t     * RIPEMD160 hash algorithm.\n\t     */\n\t    var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({\n\t        _doReset: function () {\n\t            this._hash  = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);\n\t        },\n\n\t        _doProcessBlock: function (M, offset) {\n\n\t            // Swap endian\n\t            for (var i = 0; i < 16; i++) {\n\t                // Shortcuts\n\t                var offset_i = offset + i;\n\t                var M_offset_i = M[offset_i];\n\n\t                // Swap\n\t                M[offset_i] = (\n\t                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |\n\t                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)\n\t                );\n\t            }\n\t            // Shortcut\n\t            var H  = this._hash.words;\n\t            var hl = _hl.words;\n\t            var hr = _hr.words;\n\t            var zl = _zl.words;\n\t            var zr = _zr.words;\n\t            var sl = _sl.words;\n\t            var sr = _sr.words;\n\n\t            // Working variables\n\t            var al, bl, cl, dl, el;\n\t            var ar, br, cr, dr, er;\n\n\t            ar = al = H[0];\n\t            br = bl = H[1];\n\t            cr = cl = H[2];\n\t            dr = dl = H[3];\n\t            er = el = H[4];\n\t            // Computation\n\t            var t;\n\t            for (var i = 0; i < 80; i += 1) {\n\t                t = (al +  M[offset+zl[i]])|0;\n\t                if (i<16){\n\t\t            t +=  f1(bl,cl,dl) + hl[0];\n\t                } else if (i<32) {\n\t\t            t +=  f2(bl,cl,dl) + hl[1];\n\t                } else if (i<48) {\n\t\t            t +=  f3(bl,cl,dl) + hl[2];\n\t                } else if (i<64) {\n\t\t            t +=  f4(bl,cl,dl) + hl[3];\n\t                } else {// if (i<80) {\n\t\t            t +=  f5(bl,cl,dl) + hl[4];\n\t                }\n\t                t = t|0;\n\t                t =  rotl(t,sl[i]);\n\t                t = (t+el)|0;\n\t                al = el;\n\t                el = dl;\n\t                dl = rotl(cl, 10);\n\t                cl = bl;\n\t                bl = t;\n\n\t                t = (ar + M[offset+zr[i]])|0;\n\t                if (i<16){\n\t\t            t +=  f5(br,cr,dr) + hr[0];\n\t                } else if (i<32) {\n\t\t            t +=  f4(br,cr,dr) + hr[1];\n\t                } else if (i<48) {\n\t\t            t +=  f3(br,cr,dr) + hr[2];\n\t                } else if (i<64) {\n\t\t            t +=  f2(br,cr,dr) + hr[3];\n\t                } else {// if (i<80) {\n\t\t            t +=  f1(br,cr,dr) + hr[4];\n\t                }\n\t                t = t|0;\n\t                t =  rotl(t,sr[i]) ;\n\t                t = (t+er)|0;\n\t                ar = er;\n\t                er = dr;\n\t                dr = rotl(cr, 10);\n\t                cr = br;\n\t                br = t;\n\t            }\n\t            // Intermediate hash value\n\t            t    = (H[1] + cl + dr)|0;\n\t            H[1] = (H[2] + dl + er)|0;\n\t            H[2] = (H[3] + el + ar)|0;\n\t            H[3] = (H[4] + al + br)|0;\n\t            H[4] = (H[0] + bl + cr)|0;\n\t            H[0] =  t;\n\t        },\n\n\t        _doFinalize: function () {\n\t            // Shortcuts\n\t            var data = this._data;\n\t            var dataWords = data.words;\n\n\t            var nBitsTotal = this._nDataBytes * 8;\n\t            var nBitsLeft = data.sigBytes * 8;\n\n\t            // Add padding\n\t            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);\n\t            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (\n\t                (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |\n\t                (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)\n\t            );\n\t            data.sigBytes = (dataWords.length + 1) * 4;\n\n\t            // Hash final blocks\n\t            this._process();\n\n\t            // Shortcuts\n\t            var hash = this._hash;\n\t            var H = hash.words;\n\n\t            // Swap endian\n\t            for (var i = 0; i < 5; i++) {\n\t                // Shortcut\n\t                var H_i = H[i];\n\n\t                // Swap\n\t                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |\n\t                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);\n\t            }\n\n\t            // Return final computed hash\n\t            return hash;\n\t        },\n\n\t        clone: function () {\n\t            var clone = Hasher.clone.call(this);\n\t            clone._hash = this._hash.clone();\n\n\t            return clone;\n\t        }\n\t    });\n\n\n\t    function f1(x, y, z) {\n\t        return ((x) ^ (y) ^ (z));\n\n\t    }\n\n\t    function f2(x, y, z) {\n\t        return (((x)&(y)) | ((~x)&(z)));\n\t    }\n\n\t    function f3(x, y, z) {\n\t        return (((x) | (~(y))) ^ (z));\n\t    }\n\n\t    function f4(x, y, z) {\n\t        return (((x) & (z)) | ((y)&(~(z))));\n\t    }\n\n\t    function f5(x, y, z) {\n\t        return ((x) ^ ((y) |(~(z))));\n\n\t    }\n\n\t    function rotl(x,n) {\n\t        return (x<<n) | (x>>>(32-n));\n\t    }\n\n\n\t    /**\n\t     * Shortcut function to the hasher's object interface.\n\t     *\n\t     * @param {WordArray|string} message The message to hash.\n\t     *\n\t     * @return {WordArray} The hash.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var hash = CryptoJS.RIPEMD160('message');\n\t     *     var hash = CryptoJS.RIPEMD160(wordArray);\n\t     */\n\t    C.RIPEMD160 = Hasher._createHelper(RIPEMD160);\n\n\t    /**\n\t     * Shortcut function to the HMAC's object interface.\n\t     *\n\t     * @param {WordArray|string} message The message to hash.\n\t     * @param {WordArray|string} key The secret key.\n\t     *\n\t     * @return {WordArray} The HMAC.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var hmac = CryptoJS.HmacRIPEMD160(message, key);\n\t     */\n\t    C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);\n\t}(Math));\n\n\n\treturn CryptoJS.RIPEMD160;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/ripemd160.js?");

/***/ }),

/***/ "./node_modules/crypto-js/sha1.js":
/*!****************************************!*\
  !*** ./node_modules/crypto-js/sha1.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function () {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var WordArray = C_lib.WordArray;\n\t    var Hasher = C_lib.Hasher;\n\t    var C_algo = C.algo;\n\n\t    // Reusable object\n\t    var W = [];\n\n\t    /**\n\t     * SHA-1 hash algorithm.\n\t     */\n\t    var SHA1 = C_algo.SHA1 = Hasher.extend({\n\t        _doReset: function () {\n\t            this._hash = new WordArray.init([\n\t                0x67452301, 0xefcdab89,\n\t                0x98badcfe, 0x10325476,\n\t                0xc3d2e1f0\n\t            ]);\n\t        },\n\n\t        _doProcessBlock: function (M, offset) {\n\t            // Shortcut\n\t            var H = this._hash.words;\n\n\t            // Working variables\n\t            var a = H[0];\n\t            var b = H[1];\n\t            var c = H[2];\n\t            var d = H[3];\n\t            var e = H[4];\n\n\t            // Computation\n\t            for (var i = 0; i < 80; i++) {\n\t                if (i < 16) {\n\t                    W[i] = M[offset + i] | 0;\n\t                } else {\n\t                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];\n\t                    W[i] = (n << 1) | (n >>> 31);\n\t                }\n\n\t                var t = ((a << 5) | (a >>> 27)) + e + W[i];\n\t                if (i < 20) {\n\t                    t += ((b & c) | (~b & d)) + 0x5a827999;\n\t                } else if (i < 40) {\n\t                    t += (b ^ c ^ d) + 0x6ed9eba1;\n\t                } else if (i < 60) {\n\t                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;\n\t                } else /* if (i < 80) */ {\n\t                    t += (b ^ c ^ d) - 0x359d3e2a;\n\t                }\n\n\t                e = d;\n\t                d = c;\n\t                c = (b << 30) | (b >>> 2);\n\t                b = a;\n\t                a = t;\n\t            }\n\n\t            // Intermediate hash value\n\t            H[0] = (H[0] + a) | 0;\n\t            H[1] = (H[1] + b) | 0;\n\t            H[2] = (H[2] + c) | 0;\n\t            H[3] = (H[3] + d) | 0;\n\t            H[4] = (H[4] + e) | 0;\n\t        },\n\n\t        _doFinalize: function () {\n\t            // Shortcuts\n\t            var data = this._data;\n\t            var dataWords = data.words;\n\n\t            var nBitsTotal = this._nDataBytes * 8;\n\t            var nBitsLeft = data.sigBytes * 8;\n\n\t            // Add padding\n\t            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);\n\t            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);\n\t            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;\n\t            data.sigBytes = dataWords.length * 4;\n\n\t            // Hash final blocks\n\t            this._process();\n\n\t            // Return final computed hash\n\t            return this._hash;\n\t        },\n\n\t        clone: function () {\n\t            var clone = Hasher.clone.call(this);\n\t            clone._hash = this._hash.clone();\n\n\t            return clone;\n\t        }\n\t    });\n\n\t    /**\n\t     * Shortcut function to the hasher's object interface.\n\t     *\n\t     * @param {WordArray|string} message The message to hash.\n\t     *\n\t     * @return {WordArray} The hash.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var hash = CryptoJS.SHA1('message');\n\t     *     var hash = CryptoJS.SHA1(wordArray);\n\t     */\n\t    C.SHA1 = Hasher._createHelper(SHA1);\n\n\t    /**\n\t     * Shortcut function to the HMAC's object interface.\n\t     *\n\t     * @param {WordArray|string} message The message to hash.\n\t     * @param {WordArray|string} key The secret key.\n\t     *\n\t     * @return {WordArray} The HMAC.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var hmac = CryptoJS.HmacSHA1(message, key);\n\t     */\n\t    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);\n\t}());\n\n\n\treturn CryptoJS.SHA1;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/sha1.js?");

/***/ }),

/***/ "./node_modules/crypto-js/sha224.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/sha224.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./sha256 */ \"./node_modules/crypto-js/sha256.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function () {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var WordArray = C_lib.WordArray;\n\t    var C_algo = C.algo;\n\t    var SHA256 = C_algo.SHA256;\n\n\t    /**\n\t     * SHA-224 hash algorithm.\n\t     */\n\t    var SHA224 = C_algo.SHA224 = SHA256.extend({\n\t        _doReset: function () {\n\t            this._hash = new WordArray.init([\n\t                0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,\n\t                0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4\n\t            ]);\n\t        },\n\n\t        _doFinalize: function () {\n\t            var hash = SHA256._doFinalize.call(this);\n\n\t            hash.sigBytes -= 4;\n\n\t            return hash;\n\t        }\n\t    });\n\n\t    /**\n\t     * Shortcut function to the hasher's object interface.\n\t     *\n\t     * @param {WordArray|string} message The message to hash.\n\t     *\n\t     * @return {WordArray} The hash.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var hash = CryptoJS.SHA224('message');\n\t     *     var hash = CryptoJS.SHA224(wordArray);\n\t     */\n\t    C.SHA224 = SHA256._createHelper(SHA224);\n\n\t    /**\n\t     * Shortcut function to the HMAC's object interface.\n\t     *\n\t     * @param {WordArray|string} message The message to hash.\n\t     * @param {WordArray|string} key The secret key.\n\t     *\n\t     * @return {WordArray} The HMAC.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var hmac = CryptoJS.HmacSHA224(message, key);\n\t     */\n\t    C.HmacSHA224 = SHA256._createHmacHelper(SHA224);\n\t}());\n\n\n\treturn CryptoJS.SHA224;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/sha224.js?");

/***/ }),

/***/ "./node_modules/crypto-js/sha256.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/sha256.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function (Math) {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var WordArray = C_lib.WordArray;\n\t    var Hasher = C_lib.Hasher;\n\t    var C_algo = C.algo;\n\n\t    // Initialization and round constants tables\n\t    var H = [];\n\t    var K = [];\n\n\t    // Compute constants\n\t    (function () {\n\t        function isPrime(n) {\n\t            var sqrtN = Math.sqrt(n);\n\t            for (var factor = 2; factor <= sqrtN; factor++) {\n\t                if (!(n % factor)) {\n\t                    return false;\n\t                }\n\t            }\n\n\t            return true;\n\t        }\n\n\t        function getFractionalBits(n) {\n\t            return ((n - (n | 0)) * 0x100000000) | 0;\n\t        }\n\n\t        var n = 2;\n\t        var nPrime = 0;\n\t        while (nPrime < 64) {\n\t            if (isPrime(n)) {\n\t                if (nPrime < 8) {\n\t                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));\n\t                }\n\t                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));\n\n\t                nPrime++;\n\t            }\n\n\t            n++;\n\t        }\n\t    }());\n\n\t    // Reusable object\n\t    var W = [];\n\n\t    /**\n\t     * SHA-256 hash algorithm.\n\t     */\n\t    var SHA256 = C_algo.SHA256 = Hasher.extend({\n\t        _doReset: function () {\n\t            this._hash = new WordArray.init(H.slice(0));\n\t        },\n\n\t        _doProcessBlock: function (M, offset) {\n\t            // Shortcut\n\t            var H = this._hash.words;\n\n\t            // Working variables\n\t            var a = H[0];\n\t            var b = H[1];\n\t            var c = H[2];\n\t            var d = H[3];\n\t            var e = H[4];\n\t            var f = H[5];\n\t            var g = H[6];\n\t            var h = H[7];\n\n\t            // Computation\n\t            for (var i = 0; i < 64; i++) {\n\t                if (i < 16) {\n\t                    W[i] = M[offset + i] | 0;\n\t                } else {\n\t                    var gamma0x = W[i - 15];\n\t                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^\n\t                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^\n\t                                   (gamma0x >>> 3);\n\n\t                    var gamma1x = W[i - 2];\n\t                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^\n\t                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^\n\t                                   (gamma1x >>> 10);\n\n\t                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];\n\t                }\n\n\t                var ch  = (e & f) ^ (~e & g);\n\t                var maj = (a & b) ^ (a & c) ^ (b & c);\n\n\t                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));\n\t                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));\n\n\t                var t1 = h + sigma1 + ch + K[i] + W[i];\n\t                var t2 = sigma0 + maj;\n\n\t                h = g;\n\t                g = f;\n\t                f = e;\n\t                e = (d + t1) | 0;\n\t                d = c;\n\t                c = b;\n\t                b = a;\n\t                a = (t1 + t2) | 0;\n\t            }\n\n\t            // Intermediate hash value\n\t            H[0] = (H[0] + a) | 0;\n\t            H[1] = (H[1] + b) | 0;\n\t            H[2] = (H[2] + c) | 0;\n\t            H[3] = (H[3] + d) | 0;\n\t            H[4] = (H[4] + e) | 0;\n\t            H[5] = (H[5] + f) | 0;\n\t            H[6] = (H[6] + g) | 0;\n\t            H[7] = (H[7] + h) | 0;\n\t        },\n\n\t        _doFinalize: function () {\n\t            // Shortcuts\n\t            var data = this._data;\n\t            var dataWords = data.words;\n\n\t            var nBitsTotal = this._nDataBytes * 8;\n\t            var nBitsLeft = data.sigBytes * 8;\n\n\t            // Add padding\n\t            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);\n\t            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);\n\t            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;\n\t            data.sigBytes = dataWords.length * 4;\n\n\t            // Hash final blocks\n\t            this._process();\n\n\t            // Return final computed hash\n\t            return this._hash;\n\t        },\n\n\t        clone: function () {\n\t            var clone = Hasher.clone.call(this);\n\t            clone._hash = this._hash.clone();\n\n\t            return clone;\n\t        }\n\t    });\n\n\t    /**\n\t     * Shortcut function to the hasher's object interface.\n\t     *\n\t     * @param {WordArray|string} message The message to hash.\n\t     *\n\t     * @return {WordArray} The hash.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var hash = CryptoJS.SHA256('message');\n\t     *     var hash = CryptoJS.SHA256(wordArray);\n\t     */\n\t    C.SHA256 = Hasher._createHelper(SHA256);\n\n\t    /**\n\t     * Shortcut function to the HMAC's object interface.\n\t     *\n\t     * @param {WordArray|string} message The message to hash.\n\t     * @param {WordArray|string} key The secret key.\n\t     *\n\t     * @return {WordArray} The HMAC.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var hmac = CryptoJS.HmacSHA256(message, key);\n\t     */\n\t    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);\n\t}(Math));\n\n\n\treturn CryptoJS.SHA256;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/sha256.js?");

/***/ }),

/***/ "./node_modules/crypto-js/sha3.js":
/*!****************************************!*\
  !*** ./node_modules/crypto-js/sha3.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./x64-core */ \"./node_modules/crypto-js/x64-core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function (Math) {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var WordArray = C_lib.WordArray;\n\t    var Hasher = C_lib.Hasher;\n\t    var C_x64 = C.x64;\n\t    var X64Word = C_x64.Word;\n\t    var C_algo = C.algo;\n\n\t    // Constants tables\n\t    var RHO_OFFSETS = [];\n\t    var PI_INDEXES  = [];\n\t    var ROUND_CONSTANTS = [];\n\n\t    // Compute Constants\n\t    (function () {\n\t        // Compute rho offset constants\n\t        var x = 1, y = 0;\n\t        for (var t = 0; t < 24; t++) {\n\t            RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;\n\n\t            var newX = y % 5;\n\t            var newY = (2 * x + 3 * y) % 5;\n\t            x = newX;\n\t            y = newY;\n\t        }\n\n\t        // Compute pi index constants\n\t        for (var x = 0; x < 5; x++) {\n\t            for (var y = 0; y < 5; y++) {\n\t                PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;\n\t            }\n\t        }\n\n\t        // Compute round constants\n\t        var LFSR = 0x01;\n\t        for (var i = 0; i < 24; i++) {\n\t            var roundConstantMsw = 0;\n\t            var roundConstantLsw = 0;\n\n\t            for (var j = 0; j < 7; j++) {\n\t                if (LFSR & 0x01) {\n\t                    var bitPosition = (1 << j) - 1;\n\t                    if (bitPosition < 32) {\n\t                        roundConstantLsw ^= 1 << bitPosition;\n\t                    } else /* if (bitPosition >= 32) */ {\n\t                        roundConstantMsw ^= 1 << (bitPosition - 32);\n\t                    }\n\t                }\n\n\t                // Compute next LFSR\n\t                if (LFSR & 0x80) {\n\t                    // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1\n\t                    LFSR = (LFSR << 1) ^ 0x71;\n\t                } else {\n\t                    LFSR <<= 1;\n\t                }\n\t            }\n\n\t            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);\n\t        }\n\t    }());\n\n\t    // Reusable objects for temporary values\n\t    var T = [];\n\t    (function () {\n\t        for (var i = 0; i < 25; i++) {\n\t            T[i] = X64Word.create();\n\t        }\n\t    }());\n\n\t    /**\n\t     * SHA-3 hash algorithm.\n\t     */\n\t    var SHA3 = C_algo.SHA3 = Hasher.extend({\n\t        /**\n\t         * Configuration options.\n\t         *\n\t         * @property {number} outputLength\n\t         *   The desired number of bits in the output hash.\n\t         *   Only values permitted are: 224, 256, 384, 512.\n\t         *   Default: 512\n\t         */\n\t        cfg: Hasher.cfg.extend({\n\t            outputLength: 512\n\t        }),\n\n\t        _doReset: function () {\n\t            var state = this._state = []\n\t            for (var i = 0; i < 25; i++) {\n\t                state[i] = new X64Word.init();\n\t            }\n\n\t            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;\n\t        },\n\n\t        _doProcessBlock: function (M, offset) {\n\t            // Shortcuts\n\t            var state = this._state;\n\t            var nBlockSizeLanes = this.blockSize / 2;\n\n\t            // Absorb\n\t            for (var i = 0; i < nBlockSizeLanes; i++) {\n\t                // Shortcuts\n\t                var M2i  = M[offset + 2 * i];\n\t                var M2i1 = M[offset + 2 * i + 1];\n\n\t                // Swap endian\n\t                M2i = (\n\t                    (((M2i << 8)  | (M2i >>> 24)) & 0x00ff00ff) |\n\t                    (((M2i << 24) | (M2i >>> 8))  & 0xff00ff00)\n\t                );\n\t                M2i1 = (\n\t                    (((M2i1 << 8)  | (M2i1 >>> 24)) & 0x00ff00ff) |\n\t                    (((M2i1 << 24) | (M2i1 >>> 8))  & 0xff00ff00)\n\t                );\n\n\t                // Absorb message into state\n\t                var lane = state[i];\n\t                lane.high ^= M2i1;\n\t                lane.low  ^= M2i;\n\t            }\n\n\t            // Rounds\n\t            for (var round = 0; round < 24; round++) {\n\t                // Theta\n\t                for (var x = 0; x < 5; x++) {\n\t                    // Mix column lanes\n\t                    var tMsw = 0, tLsw = 0;\n\t                    for (var y = 0; y < 5; y++) {\n\t                        var lane = state[x + 5 * y];\n\t                        tMsw ^= lane.high;\n\t                        tLsw ^= lane.low;\n\t                    }\n\n\t                    // Temporary values\n\t                    var Tx = T[x];\n\t                    Tx.high = tMsw;\n\t                    Tx.low  = tLsw;\n\t                }\n\t                for (var x = 0; x < 5; x++) {\n\t                    // Shortcuts\n\t                    var Tx4 = T[(x + 4) % 5];\n\t                    var Tx1 = T[(x + 1) % 5];\n\t                    var Tx1Msw = Tx1.high;\n\t                    var Tx1Lsw = Tx1.low;\n\n\t                    // Mix surrounding columns\n\t                    var tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));\n\t                    var tLsw = Tx4.low  ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));\n\t                    for (var y = 0; y < 5; y++) {\n\t                        var lane = state[x + 5 * y];\n\t                        lane.high ^= tMsw;\n\t                        lane.low  ^= tLsw;\n\t                    }\n\t                }\n\n\t                // Rho Pi\n\t                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {\n\t                    var tMsw;\n\t                    var tLsw;\n\n\t                    // Shortcuts\n\t                    var lane = state[laneIndex];\n\t                    var laneMsw = lane.high;\n\t                    var laneLsw = lane.low;\n\t                    var rhoOffset = RHO_OFFSETS[laneIndex];\n\n\t                    // Rotate lanes\n\t                    if (rhoOffset < 32) {\n\t                        tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));\n\t                        tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));\n\t                    } else /* if (rhoOffset >= 32) */ {\n\t                        tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));\n\t                        tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));\n\t                    }\n\n\t                    // Transpose lanes\n\t                    var TPiLane = T[PI_INDEXES[laneIndex]];\n\t                    TPiLane.high = tMsw;\n\t                    TPiLane.low  = tLsw;\n\t                }\n\n\t                // Rho pi at x = y = 0\n\t                var T0 = T[0];\n\t                var state0 = state[0];\n\t                T0.high = state0.high;\n\t                T0.low  = state0.low;\n\n\t                // Chi\n\t                for (var x = 0; x < 5; x++) {\n\t                    for (var y = 0; y < 5; y++) {\n\t                        // Shortcuts\n\t                        var laneIndex = x + 5 * y;\n\t                        var lane = state[laneIndex];\n\t                        var TLane = T[laneIndex];\n\t                        var Tx1Lane = T[((x + 1) % 5) + 5 * y];\n\t                        var Tx2Lane = T[((x + 2) % 5) + 5 * y];\n\n\t                        // Mix rows\n\t                        lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);\n\t                        lane.low  = TLane.low  ^ (~Tx1Lane.low  & Tx2Lane.low);\n\t                    }\n\t                }\n\n\t                // Iota\n\t                var lane = state[0];\n\t                var roundConstant = ROUND_CONSTANTS[round];\n\t                lane.high ^= roundConstant.high;\n\t                lane.low  ^= roundConstant.low;\n\t            }\n\t        },\n\n\t        _doFinalize: function () {\n\t            // Shortcuts\n\t            var data = this._data;\n\t            var dataWords = data.words;\n\t            var nBitsTotal = this._nDataBytes * 8;\n\t            var nBitsLeft = data.sigBytes * 8;\n\t            var blockSizeBits = this.blockSize * 32;\n\n\t            // Add padding\n\t            dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);\n\t            dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;\n\t            data.sigBytes = dataWords.length * 4;\n\n\t            // Hash final blocks\n\t            this._process();\n\n\t            // Shortcuts\n\t            var state = this._state;\n\t            var outputLengthBytes = this.cfg.outputLength / 8;\n\t            var outputLengthLanes = outputLengthBytes / 8;\n\n\t            // Squeeze\n\t            var hashWords = [];\n\t            for (var i = 0; i < outputLengthLanes; i++) {\n\t                // Shortcuts\n\t                var lane = state[i];\n\t                var laneMsw = lane.high;\n\t                var laneLsw = lane.low;\n\n\t                // Swap endian\n\t                laneMsw = (\n\t                    (((laneMsw << 8)  | (laneMsw >>> 24)) & 0x00ff00ff) |\n\t                    (((laneMsw << 24) | (laneMsw >>> 8))  & 0xff00ff00)\n\t                );\n\t                laneLsw = (\n\t                    (((laneLsw << 8)  | (laneLsw >>> 24)) & 0x00ff00ff) |\n\t                    (((laneLsw << 24) | (laneLsw >>> 8))  & 0xff00ff00)\n\t                );\n\n\t                // Squeeze state to retrieve hash\n\t                hashWords.push(laneLsw);\n\t                hashWords.push(laneMsw);\n\t            }\n\n\t            // Return final computed hash\n\t            return new WordArray.init(hashWords, outputLengthBytes);\n\t        },\n\n\t        clone: function () {\n\t            var clone = Hasher.clone.call(this);\n\n\t            var state = clone._state = this._state.slice(0);\n\t            for (var i = 0; i < 25; i++) {\n\t                state[i] = state[i].clone();\n\t            }\n\n\t            return clone;\n\t        }\n\t    });\n\n\t    /**\n\t     * Shortcut function to the hasher's object interface.\n\t     *\n\t     * @param {WordArray|string} message The message to hash.\n\t     *\n\t     * @return {WordArray} The hash.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var hash = CryptoJS.SHA3('message');\n\t     *     var hash = CryptoJS.SHA3(wordArray);\n\t     */\n\t    C.SHA3 = Hasher._createHelper(SHA3);\n\n\t    /**\n\t     * Shortcut function to the HMAC's object interface.\n\t     *\n\t     * @param {WordArray|string} message The message to hash.\n\t     * @param {WordArray|string} key The secret key.\n\t     *\n\t     * @return {WordArray} The HMAC.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var hmac = CryptoJS.HmacSHA3(message, key);\n\t     */\n\t    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);\n\t}(Math));\n\n\n\treturn CryptoJS.SHA3;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/sha3.js?");

/***/ }),

/***/ "./node_modules/crypto-js/sha384.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/sha384.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./x64-core */ \"./node_modules/crypto-js/x64-core.js\"), __webpack_require__(/*! ./sha512 */ \"./node_modules/crypto-js/sha512.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function () {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_x64 = C.x64;\n\t    var X64Word = C_x64.Word;\n\t    var X64WordArray = C_x64.WordArray;\n\t    var C_algo = C.algo;\n\t    var SHA512 = C_algo.SHA512;\n\n\t    /**\n\t     * SHA-384 hash algorithm.\n\t     */\n\t    var SHA384 = C_algo.SHA384 = SHA512.extend({\n\t        _doReset: function () {\n\t            this._hash = new X64WordArray.init([\n\t                new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507),\n\t                new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939),\n\t                new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511),\n\t                new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)\n\t            ]);\n\t        },\n\n\t        _doFinalize: function () {\n\t            var hash = SHA512._doFinalize.call(this);\n\n\t            hash.sigBytes -= 16;\n\n\t            return hash;\n\t        }\n\t    });\n\n\t    /**\n\t     * Shortcut function to the hasher's object interface.\n\t     *\n\t     * @param {WordArray|string} message The message to hash.\n\t     *\n\t     * @return {WordArray} The hash.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var hash = CryptoJS.SHA384('message');\n\t     *     var hash = CryptoJS.SHA384(wordArray);\n\t     */\n\t    C.SHA384 = SHA512._createHelper(SHA384);\n\n\t    /**\n\t     * Shortcut function to the HMAC's object interface.\n\t     *\n\t     * @param {WordArray|string} message The message to hash.\n\t     * @param {WordArray|string} key The secret key.\n\t     *\n\t     * @return {WordArray} The HMAC.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var hmac = CryptoJS.HmacSHA384(message, key);\n\t     */\n\t    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);\n\t}());\n\n\n\treturn CryptoJS.SHA384;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/sha384.js?");

/***/ }),

/***/ "./node_modules/crypto-js/sha512.js":
/*!******************************************!*\
  !*** ./node_modules/crypto-js/sha512.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./x64-core */ \"./node_modules/crypto-js/x64-core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function () {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var Hasher = C_lib.Hasher;\n\t    var C_x64 = C.x64;\n\t    var X64Word = C_x64.Word;\n\t    var X64WordArray = C_x64.WordArray;\n\t    var C_algo = C.algo;\n\n\t    function X64Word_create() {\n\t        return X64Word.create.apply(X64Word, arguments);\n\t    }\n\n\t    // Constants\n\t    var K = [\n\t        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),\n\t        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),\n\t        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),\n\t        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),\n\t        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),\n\t        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),\n\t        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),\n\t        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),\n\t        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),\n\t        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),\n\t        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),\n\t        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),\n\t        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),\n\t        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),\n\t        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),\n\t        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),\n\t        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),\n\t        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),\n\t        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),\n\t        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),\n\t        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),\n\t        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),\n\t        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),\n\t        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),\n\t        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),\n\t        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),\n\t        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),\n\t        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),\n\t        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),\n\t        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),\n\t        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),\n\t        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),\n\t        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),\n\t        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),\n\t        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),\n\t        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),\n\t        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),\n\t        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),\n\t        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),\n\t        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)\n\t    ];\n\n\t    // Reusable objects\n\t    var W = [];\n\t    (function () {\n\t        for (var i = 0; i < 80; i++) {\n\t            W[i] = X64Word_create();\n\t        }\n\t    }());\n\n\t    /**\n\t     * SHA-512 hash algorithm.\n\t     */\n\t    var SHA512 = C_algo.SHA512 = Hasher.extend({\n\t        _doReset: function () {\n\t            this._hash = new X64WordArray.init([\n\t                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),\n\t                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),\n\t                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),\n\t                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)\n\t            ]);\n\t        },\n\n\t        _doProcessBlock: function (M, offset) {\n\t            // Shortcuts\n\t            var H = this._hash.words;\n\n\t            var H0 = H[0];\n\t            var H1 = H[1];\n\t            var H2 = H[2];\n\t            var H3 = H[3];\n\t            var H4 = H[4];\n\t            var H5 = H[5];\n\t            var H6 = H[6];\n\t            var H7 = H[7];\n\n\t            var H0h = H0.high;\n\t            var H0l = H0.low;\n\t            var H1h = H1.high;\n\t            var H1l = H1.low;\n\t            var H2h = H2.high;\n\t            var H2l = H2.low;\n\t            var H3h = H3.high;\n\t            var H3l = H3.low;\n\t            var H4h = H4.high;\n\t            var H4l = H4.low;\n\t            var H5h = H5.high;\n\t            var H5l = H5.low;\n\t            var H6h = H6.high;\n\t            var H6l = H6.low;\n\t            var H7h = H7.high;\n\t            var H7l = H7.low;\n\n\t            // Working variables\n\t            var ah = H0h;\n\t            var al = H0l;\n\t            var bh = H1h;\n\t            var bl = H1l;\n\t            var ch = H2h;\n\t            var cl = H2l;\n\t            var dh = H3h;\n\t            var dl = H3l;\n\t            var eh = H4h;\n\t            var el = H4l;\n\t            var fh = H5h;\n\t            var fl = H5l;\n\t            var gh = H6h;\n\t            var gl = H6l;\n\t            var hh = H7h;\n\t            var hl = H7l;\n\n\t            // Rounds\n\t            for (var i = 0; i < 80; i++) {\n\t                var Wil;\n\t                var Wih;\n\n\t                // Shortcut\n\t                var Wi = W[i];\n\n\t                // Extend message\n\t                if (i < 16) {\n\t                    Wih = Wi.high = M[offset + i * 2]     | 0;\n\t                    Wil = Wi.low  = M[offset + i * 2 + 1] | 0;\n\t                } else {\n\t                    // Gamma0\n\t                    var gamma0x  = W[i - 15];\n\t                    var gamma0xh = gamma0x.high;\n\t                    var gamma0xl = gamma0x.low;\n\t                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);\n\t                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));\n\n\t                    // Gamma1\n\t                    var gamma1x  = W[i - 2];\n\t                    var gamma1xh = gamma1x.high;\n\t                    var gamma1xl = gamma1x.low;\n\t                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);\n\t                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));\n\n\t                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]\n\t                    var Wi7  = W[i - 7];\n\t                    var Wi7h = Wi7.high;\n\t                    var Wi7l = Wi7.low;\n\n\t                    var Wi16  = W[i - 16];\n\t                    var Wi16h = Wi16.high;\n\t                    var Wi16l = Wi16.low;\n\n\t                    Wil = gamma0l + Wi7l;\n\t                    Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);\n\t                    Wil = Wil + gamma1l;\n\t                    Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);\n\t                    Wil = Wil + Wi16l;\n\t                    Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);\n\n\t                    Wi.high = Wih;\n\t                    Wi.low  = Wil;\n\t                }\n\n\t                var chh  = (eh & fh) ^ (~eh & gh);\n\t                var chl  = (el & fl) ^ (~el & gl);\n\t                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);\n\t                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);\n\n\t                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));\n\t                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));\n\t                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));\n\t                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));\n\n\t                // t1 = h + sigma1 + ch + K[i] + W[i]\n\t                var Ki  = K[i];\n\t                var Kih = Ki.high;\n\t                var Kil = Ki.low;\n\n\t                var t1l = hl + sigma1l;\n\t                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);\n\t                var t1l = t1l + chl;\n\t                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);\n\t                var t1l = t1l + Kil;\n\t                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);\n\t                var t1l = t1l + Wil;\n\t                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);\n\n\t                // t2 = sigma0 + maj\n\t                var t2l = sigma0l + majl;\n\t                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);\n\n\t                // Update working variables\n\t                hh = gh;\n\t                hl = gl;\n\t                gh = fh;\n\t                gl = fl;\n\t                fh = eh;\n\t                fl = el;\n\t                el = (dl + t1l) | 0;\n\t                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;\n\t                dh = ch;\n\t                dl = cl;\n\t                ch = bh;\n\t                cl = bl;\n\t                bh = ah;\n\t                bl = al;\n\t                al = (t1l + t2l) | 0;\n\t                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;\n\t            }\n\n\t            // Intermediate hash value\n\t            H0l = H0.low  = (H0l + al);\n\t            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));\n\t            H1l = H1.low  = (H1l + bl);\n\t            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));\n\t            H2l = H2.low  = (H2l + cl);\n\t            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));\n\t            H3l = H3.low  = (H3l + dl);\n\t            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));\n\t            H4l = H4.low  = (H4l + el);\n\t            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));\n\t            H5l = H5.low  = (H5l + fl);\n\t            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));\n\t            H6l = H6.low  = (H6l + gl);\n\t            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));\n\t            H7l = H7.low  = (H7l + hl);\n\t            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));\n\t        },\n\n\t        _doFinalize: function () {\n\t            // Shortcuts\n\t            var data = this._data;\n\t            var dataWords = data.words;\n\n\t            var nBitsTotal = this._nDataBytes * 8;\n\t            var nBitsLeft = data.sigBytes * 8;\n\n\t            // Add padding\n\t            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);\n\t            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);\n\t            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;\n\t            data.sigBytes = dataWords.length * 4;\n\n\t            // Hash final blocks\n\t            this._process();\n\n\t            // Convert hash to 32-bit word array before returning\n\t            var hash = this._hash.toX32();\n\n\t            // Return final computed hash\n\t            return hash;\n\t        },\n\n\t        clone: function () {\n\t            var clone = Hasher.clone.call(this);\n\t            clone._hash = this._hash.clone();\n\n\t            return clone;\n\t        },\n\n\t        blockSize: 1024/32\n\t    });\n\n\t    /**\n\t     * Shortcut function to the hasher's object interface.\n\t     *\n\t     * @param {WordArray|string} message The message to hash.\n\t     *\n\t     * @return {WordArray} The hash.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var hash = CryptoJS.SHA512('message');\n\t     *     var hash = CryptoJS.SHA512(wordArray);\n\t     */\n\t    C.SHA512 = Hasher._createHelper(SHA512);\n\n\t    /**\n\t     * Shortcut function to the HMAC's object interface.\n\t     *\n\t     * @param {WordArray|string} message The message to hash.\n\t     * @param {WordArray|string} key The secret key.\n\t     *\n\t     * @return {WordArray} The HMAC.\n\t     *\n\t     * @static\n\t     *\n\t     * @example\n\t     *\n\t     *     var hmac = CryptoJS.HmacSHA512(message, key);\n\t     */\n\t    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);\n\t}());\n\n\n\treturn CryptoJS.SHA512;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/sha512.js?");

/***/ }),

/***/ "./node_modules/crypto-js/tripledes.js":
/*!*********************************************!*\
  !*** ./node_modules/crypto-js/tripledes.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory, undef) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"), __webpack_require__(/*! ./enc-base64 */ \"./node_modules/crypto-js/enc-base64.js\"), __webpack_require__(/*! ./md5 */ \"./node_modules/crypto-js/md5.js\"), __webpack_require__(/*! ./evpkdf */ \"./node_modules/crypto-js/evpkdf.js\"), __webpack_require__(/*! ./cipher-core */ \"./node_modules/crypto-js/cipher-core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function () {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var WordArray = C_lib.WordArray;\n\t    var BlockCipher = C_lib.BlockCipher;\n\t    var C_algo = C.algo;\n\n\t    // Permuted Choice 1 constants\n\t    var PC1 = [\n\t        57, 49, 41, 33, 25, 17, 9,  1,\n\t        58, 50, 42, 34, 26, 18, 10, 2,\n\t        59, 51, 43, 35, 27, 19, 11, 3,\n\t        60, 52, 44, 36, 63, 55, 47, 39,\n\t        31, 23, 15, 7,  62, 54, 46, 38,\n\t        30, 22, 14, 6,  61, 53, 45, 37,\n\t        29, 21, 13, 5,  28, 20, 12, 4\n\t    ];\n\n\t    // Permuted Choice 2 constants\n\t    var PC2 = [\n\t        14, 17, 11, 24, 1,  5,\n\t        3,  28, 15, 6,  21, 10,\n\t        23, 19, 12, 4,  26, 8,\n\t        16, 7,  27, 20, 13, 2,\n\t        41, 52, 31, 37, 47, 55,\n\t        30, 40, 51, 45, 33, 48,\n\t        44, 49, 39, 56, 34, 53,\n\t        46, 42, 50, 36, 29, 32\n\t    ];\n\n\t    // Cumulative bit shift constants\n\t    var BIT_SHIFTS = [1,  2,  4,  6,  8,  10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];\n\n\t    // SBOXes and round permutation constants\n\t    var SBOX_P = [\n\t        {\n\t            0x0: 0x808200,\n\t            0x10000000: 0x8000,\n\t            0x20000000: 0x808002,\n\t            0x30000000: 0x2,\n\t            0x40000000: 0x200,\n\t            0x50000000: 0x808202,\n\t            0x60000000: 0x800202,\n\t            0x70000000: 0x800000,\n\t            0x80000000: 0x202,\n\t            0x90000000: 0x800200,\n\t            0xa0000000: 0x8200,\n\t            0xb0000000: 0x808000,\n\t            0xc0000000: 0x8002,\n\t            0xd0000000: 0x800002,\n\t            0xe0000000: 0x0,\n\t            0xf0000000: 0x8202,\n\t            0x8000000: 0x0,\n\t            0x18000000: 0x808202,\n\t            0x28000000: 0x8202,\n\t            0x38000000: 0x8000,\n\t            0x48000000: 0x808200,\n\t            0x58000000: 0x200,\n\t            0x68000000: 0x808002,\n\t            0x78000000: 0x2,\n\t            0x88000000: 0x800200,\n\t            0x98000000: 0x8200,\n\t            0xa8000000: 0x808000,\n\t            0xb8000000: 0x800202,\n\t            0xc8000000: 0x800002,\n\t            0xd8000000: 0x8002,\n\t            0xe8000000: 0x202,\n\t            0xf8000000: 0x800000,\n\t            0x1: 0x8000,\n\t            0x10000001: 0x2,\n\t            0x20000001: 0x808200,\n\t            0x30000001: 0x800000,\n\t            0x40000001: 0x808002,\n\t            0x50000001: 0x8200,\n\t            0x60000001: 0x200,\n\t            0x70000001: 0x800202,\n\t            0x80000001: 0x808202,\n\t            0x90000001: 0x808000,\n\t            0xa0000001: 0x800002,\n\t            0xb0000001: 0x8202,\n\t            0xc0000001: 0x202,\n\t            0xd0000001: 0x800200,\n\t            0xe0000001: 0x8002,\n\t            0xf0000001: 0x0,\n\t            0x8000001: 0x808202,\n\t            0x18000001: 0x808000,\n\t            0x28000001: 0x800000,\n\t            0x38000001: 0x200,\n\t            0x48000001: 0x8000,\n\t            0x58000001: 0x800002,\n\t            0x68000001: 0x2,\n\t            0x78000001: 0x8202,\n\t            0x88000001: 0x8002,\n\t            0x98000001: 0x800202,\n\t            0xa8000001: 0x202,\n\t            0xb8000001: 0x808200,\n\t            0xc8000001: 0x800200,\n\t            0xd8000001: 0x0,\n\t            0xe8000001: 0x8200,\n\t            0xf8000001: 0x808002\n\t        },\n\t        {\n\t            0x0: 0x40084010,\n\t            0x1000000: 0x4000,\n\t            0x2000000: 0x80000,\n\t            0x3000000: 0x40080010,\n\t            0x4000000: 0x40000010,\n\t            0x5000000: 0x40084000,\n\t            0x6000000: 0x40004000,\n\t            0x7000000: 0x10,\n\t            0x8000000: 0x84000,\n\t            0x9000000: 0x40004010,\n\t            0xa000000: 0x40000000,\n\t            0xb000000: 0x84010,\n\t            0xc000000: 0x80010,\n\t            0xd000000: 0x0,\n\t            0xe000000: 0x4010,\n\t            0xf000000: 0x40080000,\n\t            0x800000: 0x40004000,\n\t            0x1800000: 0x84010,\n\t            0x2800000: 0x10,\n\t            0x3800000: 0x40004010,\n\t            0x4800000: 0x40084010,\n\t            0x5800000: 0x40000000,\n\t            0x6800000: 0x80000,\n\t            0x7800000: 0x40080010,\n\t            0x8800000: 0x80010,\n\t            0x9800000: 0x0,\n\t            0xa800000: 0x4000,\n\t            0xb800000: 0x40080000,\n\t            0xc800000: 0x40000010,\n\t            0xd800000: 0x84000,\n\t            0xe800000: 0x40084000,\n\t            0xf800000: 0x4010,\n\t            0x10000000: 0x0,\n\t            0x11000000: 0x40080010,\n\t            0x12000000: 0x40004010,\n\t            0x13000000: 0x40084000,\n\t            0x14000000: 0x40080000,\n\t            0x15000000: 0x10,\n\t            0x16000000: 0x84010,\n\t            0x17000000: 0x4000,\n\t            0x18000000: 0x4010,\n\t            0x19000000: 0x80000,\n\t            0x1a000000: 0x80010,\n\t            0x1b000000: 0x40000010,\n\t            0x1c000000: 0x84000,\n\t            0x1d000000: 0x40004000,\n\t            0x1e000000: 0x40000000,\n\t            0x1f000000: 0x40084010,\n\t            0x10800000: 0x84010,\n\t            0x11800000: 0x80000,\n\t            0x12800000: 0x40080000,\n\t            0x13800000: 0x4000,\n\t            0x14800000: 0x40004000,\n\t            0x15800000: 0x40084010,\n\t            0x16800000: 0x10,\n\t            0x17800000: 0x40000000,\n\t            0x18800000: 0x40084000,\n\t            0x19800000: 0x40000010,\n\t            0x1a800000: 0x40004010,\n\t            0x1b800000: 0x80010,\n\t            0x1c800000: 0x0,\n\t            0x1d800000: 0x4010,\n\t            0x1e800000: 0x40080010,\n\t            0x1f800000: 0x84000\n\t        },\n\t        {\n\t            0x0: 0x104,\n\t            0x100000: 0x0,\n\t            0x200000: 0x4000100,\n\t            0x300000: 0x10104,\n\t            0x400000: 0x10004,\n\t            0x500000: 0x4000004,\n\t            0x600000: 0x4010104,\n\t            0x700000: 0x4010000,\n\t            0x800000: 0x4000000,\n\t            0x900000: 0x4010100,\n\t            0xa00000: 0x10100,\n\t            0xb00000: 0x4010004,\n\t            0xc00000: 0x4000104,\n\t            0xd00000: 0x10000,\n\t            0xe00000: 0x4,\n\t            0xf00000: 0x100,\n\t            0x80000: 0x4010100,\n\t            0x180000: 0x4010004,\n\t            0x280000: 0x0,\n\t            0x380000: 0x4000100,\n\t            0x480000: 0x4000004,\n\t            0x580000: 0x10000,\n\t            0x680000: 0x10004,\n\t            0x780000: 0x104,\n\t            0x880000: 0x4,\n\t            0x980000: 0x100,\n\t            0xa80000: 0x4010000,\n\t            0xb80000: 0x10104,\n\t            0xc80000: 0x10100,\n\t            0xd80000: 0x4000104,\n\t            0xe80000: 0x4010104,\n\t            0xf80000: 0x4000000,\n\t            0x1000000: 0x4010100,\n\t            0x1100000: 0x10004,\n\t            0x1200000: 0x10000,\n\t            0x1300000: 0x4000100,\n\t            0x1400000: 0x100,\n\t            0x1500000: 0x4010104,\n\t            0x1600000: 0x4000004,\n\t            0x1700000: 0x0,\n\t            0x1800000: 0x4000104,\n\t            0x1900000: 0x4000000,\n\t            0x1a00000: 0x4,\n\t            0x1b00000: 0x10100,\n\t            0x1c00000: 0x4010000,\n\t            0x1d00000: 0x104,\n\t            0x1e00000: 0x10104,\n\t            0x1f00000: 0x4010004,\n\t            0x1080000: 0x4000000,\n\t            0x1180000: 0x104,\n\t            0x1280000: 0x4010100,\n\t            0x1380000: 0x0,\n\t            0x1480000: 0x10004,\n\t            0x1580000: 0x4000100,\n\t            0x1680000: 0x100,\n\t            0x1780000: 0x4010004,\n\t            0x1880000: 0x10000,\n\t            0x1980000: 0x4010104,\n\t            0x1a80000: 0x10104,\n\t            0x1b80000: 0x4000004,\n\t            0x1c80000: 0x4000104,\n\t            0x1d80000: 0x4010000,\n\t            0x1e80000: 0x4,\n\t            0x1f80000: 0x10100\n\t        },\n\t        {\n\t            0x0: 0x80401000,\n\t            0x10000: 0x80001040,\n\t            0x20000: 0x401040,\n\t            0x30000: 0x80400000,\n\t            0x40000: 0x0,\n\t            0x50000: 0x401000,\n\t            0x60000: 0x80000040,\n\t            0x70000: 0x400040,\n\t            0x80000: 0x80000000,\n\t            0x90000: 0x400000,\n\t            0xa0000: 0x40,\n\t            0xb0000: 0x80001000,\n\t            0xc0000: 0x80400040,\n\t            0xd0000: 0x1040,\n\t            0xe0000: 0x1000,\n\t            0xf0000: 0x80401040,\n\t            0x8000: 0x80001040,\n\t            0x18000: 0x40,\n\t            0x28000: 0x80400040,\n\t            0x38000: 0x80001000,\n\t            0x48000: 0x401000,\n\t            0x58000: 0x80401040,\n\t            0x68000: 0x0,\n\t            0x78000: 0x80400000,\n\t            0x88000: 0x1000,\n\t            0x98000: 0x80401000,\n\t            0xa8000: 0x400000,\n\t            0xb8000: 0x1040,\n\t            0xc8000: 0x80000000,\n\t            0xd8000: 0x400040,\n\t            0xe8000: 0x401040,\n\t            0xf8000: 0x80000040,\n\t            0x100000: 0x400040,\n\t            0x110000: 0x401000,\n\t            0x120000: 0x80000040,\n\t            0x130000: 0x0,\n\t            0x140000: 0x1040,\n\t            0x150000: 0x80400040,\n\t            0x160000: 0x80401000,\n\t            0x170000: 0x80001040,\n\t            0x180000: 0x80401040,\n\t            0x190000: 0x80000000,\n\t            0x1a0000: 0x80400000,\n\t            0x1b0000: 0x401040,\n\t            0x1c0000: 0x80001000,\n\t            0x1d0000: 0x400000,\n\t            0x1e0000: 0x40,\n\t            0x1f0000: 0x1000,\n\t            0x108000: 0x80400000,\n\t            0x118000: 0x80401040,\n\t            0x128000: 0x0,\n\t            0x138000: 0x401000,\n\t            0x148000: 0x400040,\n\t            0x158000: 0x80000000,\n\t            0x168000: 0x80001040,\n\t            0x178000: 0x40,\n\t            0x188000: 0x80000040,\n\t            0x198000: 0x1000,\n\t            0x1a8000: 0x80001000,\n\t            0x1b8000: 0x80400040,\n\t            0x1c8000: 0x1040,\n\t            0x1d8000: 0x80401000,\n\t            0x1e8000: 0x400000,\n\t            0x1f8000: 0x401040\n\t        },\n\t        {\n\t            0x0: 0x80,\n\t            0x1000: 0x1040000,\n\t            0x2000: 0x40000,\n\t            0x3000: 0x20000000,\n\t            0x4000: 0x20040080,\n\t            0x5000: 0x1000080,\n\t            0x6000: 0x21000080,\n\t            0x7000: 0x40080,\n\t            0x8000: 0x1000000,\n\t            0x9000: 0x20040000,\n\t            0xa000: 0x20000080,\n\t            0xb000: 0x21040080,\n\t            0xc000: 0x21040000,\n\t            0xd000: 0x0,\n\t            0xe000: 0x1040080,\n\t            0xf000: 0x21000000,\n\t            0x800: 0x1040080,\n\t            0x1800: 0x21000080,\n\t            0x2800: 0x80,\n\t            0x3800: 0x1040000,\n\t            0x4800: 0x40000,\n\t            0x5800: 0x20040080,\n\t            0x6800: 0x21040000,\n\t            0x7800: 0x20000000,\n\t            0x8800: 0x20040000,\n\t            0x9800: 0x0,\n\t            0xa800: 0x21040080,\n\t            0xb800: 0x1000080,\n\t            0xc800: 0x20000080,\n\t            0xd800: 0x21000000,\n\t            0xe800: 0x1000000,\n\t            0xf800: 0x40080,\n\t            0x10000: 0x40000,\n\t            0x11000: 0x80,\n\t            0x12000: 0x20000000,\n\t            0x13000: 0x21000080,\n\t            0x14000: 0x1000080,\n\t            0x15000: 0x21040000,\n\t            0x16000: 0x20040080,\n\t            0x17000: 0x1000000,\n\t            0x18000: 0x21040080,\n\t            0x19000: 0x21000000,\n\t            0x1a000: 0x1040000,\n\t            0x1b000: 0x20040000,\n\t            0x1c000: 0x40080,\n\t            0x1d000: 0x20000080,\n\t            0x1e000: 0x0,\n\t            0x1f000: 0x1040080,\n\t            0x10800: 0x21000080,\n\t            0x11800: 0x1000000,\n\t            0x12800: 0x1040000,\n\t            0x13800: 0x20040080,\n\t            0x14800: 0x20000000,\n\t            0x15800: 0x1040080,\n\t            0x16800: 0x80,\n\t            0x17800: 0x21040000,\n\t            0x18800: 0x40080,\n\t            0x19800: 0x21040080,\n\t            0x1a800: 0x0,\n\t            0x1b800: 0x21000000,\n\t            0x1c800: 0x1000080,\n\t            0x1d800: 0x40000,\n\t            0x1e800: 0x20040000,\n\t            0x1f800: 0x20000080\n\t        },\n\t        {\n\t            0x0: 0x10000008,\n\t            0x100: 0x2000,\n\t            0x200: 0x10200000,\n\t            0x300: 0x10202008,\n\t            0x400: 0x10002000,\n\t            0x500: 0x200000,\n\t            0x600: 0x200008,\n\t            0x700: 0x10000000,\n\t            0x800: 0x0,\n\t            0x900: 0x10002008,\n\t            0xa00: 0x202000,\n\t            0xb00: 0x8,\n\t            0xc00: 0x10200008,\n\t            0xd00: 0x202008,\n\t            0xe00: 0x2008,\n\t            0xf00: 0x10202000,\n\t            0x80: 0x10200000,\n\t            0x180: 0x10202008,\n\t            0x280: 0x8,\n\t            0x380: 0x200000,\n\t            0x480: 0x202008,\n\t            0x580: 0x10000008,\n\t            0x680: 0x10002000,\n\t            0x780: 0x2008,\n\t            0x880: 0x200008,\n\t            0x980: 0x2000,\n\t            0xa80: 0x10002008,\n\t            0xb80: 0x10200008,\n\t            0xc80: 0x0,\n\t            0xd80: 0x10202000,\n\t            0xe80: 0x202000,\n\t            0xf80: 0x10000000,\n\t            0x1000: 0x10002000,\n\t            0x1100: 0x10200008,\n\t            0x1200: 0x10202008,\n\t            0x1300: 0x2008,\n\t            0x1400: 0x200000,\n\t            0x1500: 0x10000000,\n\t            0x1600: 0x10000008,\n\t            0x1700: 0x202000,\n\t            0x1800: 0x202008,\n\t            0x1900: 0x0,\n\t            0x1a00: 0x8,\n\t            0x1b00: 0x10200000,\n\t            0x1c00: 0x2000,\n\t            0x1d00: 0x10002008,\n\t            0x1e00: 0x10202000,\n\t            0x1f00: 0x200008,\n\t            0x1080: 0x8,\n\t            0x1180: 0x202000,\n\t            0x1280: 0x200000,\n\t            0x1380: 0x10000008,\n\t            0x1480: 0x10002000,\n\t            0x1580: 0x2008,\n\t            0x1680: 0x10202008,\n\t            0x1780: 0x10200000,\n\t            0x1880: 0x10202000,\n\t            0x1980: 0x10200008,\n\t            0x1a80: 0x2000,\n\t            0x1b80: 0x202008,\n\t            0x1c80: 0x200008,\n\t            0x1d80: 0x0,\n\t            0x1e80: 0x10000000,\n\t            0x1f80: 0x10002008\n\t        },\n\t        {\n\t            0x0: 0x100000,\n\t            0x10: 0x2000401,\n\t            0x20: 0x400,\n\t            0x30: 0x100401,\n\t            0x40: 0x2100401,\n\t            0x50: 0x0,\n\t            0x60: 0x1,\n\t            0x70: 0x2100001,\n\t            0x80: 0x2000400,\n\t            0x90: 0x100001,\n\t            0xa0: 0x2000001,\n\t            0xb0: 0x2100400,\n\t            0xc0: 0x2100000,\n\t            0xd0: 0x401,\n\t            0xe0: 0x100400,\n\t            0xf0: 0x2000000,\n\t            0x8: 0x2100001,\n\t            0x18: 0x0,\n\t            0x28: 0x2000401,\n\t            0x38: 0x2100400,\n\t            0x48: 0x100000,\n\t            0x58: 0x2000001,\n\t            0x68: 0x2000000,\n\t            0x78: 0x401,\n\t            0x88: 0x100401,\n\t            0x98: 0x2000400,\n\t            0xa8: 0x2100000,\n\t            0xb8: 0x100001,\n\t            0xc8: 0x400,\n\t            0xd8: 0x2100401,\n\t            0xe8: 0x1,\n\t            0xf8: 0x100400,\n\t            0x100: 0x2000000,\n\t            0x110: 0x100000,\n\t            0x120: 0x2000401,\n\t            0x130: 0x2100001,\n\t            0x140: 0x100001,\n\t            0x150: 0x2000400,\n\t            0x160: 0x2100400,\n\t            0x170: 0x100401,\n\t            0x180: 0x401,\n\t            0x190: 0x2100401,\n\t            0x1a0: 0x100400,\n\t            0x1b0: 0x1,\n\t            0x1c0: 0x0,\n\t            0x1d0: 0x2100000,\n\t            0x1e0: 0x2000001,\n\t            0x1f0: 0x400,\n\t            0x108: 0x100400,\n\t            0x118: 0x2000401,\n\t            0x128: 0x2100001,\n\t            0x138: 0x1,\n\t            0x148: 0x2000000,\n\t            0x158: 0x100000,\n\t            0x168: 0x401,\n\t            0x178: 0x2100400,\n\t            0x188: 0x2000001,\n\t            0x198: 0x2100000,\n\t            0x1a8: 0x0,\n\t            0x1b8: 0x2100401,\n\t            0x1c8: 0x100401,\n\t            0x1d8: 0x400,\n\t            0x1e8: 0x2000400,\n\t            0x1f8: 0x100001\n\t        },\n\t        {\n\t            0x0: 0x8000820,\n\t            0x1: 0x20000,\n\t            0x2: 0x8000000,\n\t            0x3: 0x20,\n\t            0x4: 0x20020,\n\t            0x5: 0x8020820,\n\t            0x6: 0x8020800,\n\t            0x7: 0x800,\n\t            0x8: 0x8020000,\n\t            0x9: 0x8000800,\n\t            0xa: 0x20800,\n\t            0xb: 0x8020020,\n\t            0xc: 0x820,\n\t            0xd: 0x0,\n\t            0xe: 0x8000020,\n\t            0xf: 0x20820,\n\t            0x80000000: 0x800,\n\t            0x80000001: 0x8020820,\n\t            0x80000002: 0x8000820,\n\t            0x80000003: 0x8000000,\n\t            0x80000004: 0x8020000,\n\t            0x80000005: 0x20800,\n\t            0x80000006: 0x20820,\n\t            0x80000007: 0x20,\n\t            0x80000008: 0x8000020,\n\t            0x80000009: 0x820,\n\t            0x8000000a: 0x20020,\n\t            0x8000000b: 0x8020800,\n\t            0x8000000c: 0x0,\n\t            0x8000000d: 0x8020020,\n\t            0x8000000e: 0x8000800,\n\t            0x8000000f: 0x20000,\n\t            0x10: 0x20820,\n\t            0x11: 0x8020800,\n\t            0x12: 0x20,\n\t            0x13: 0x800,\n\t            0x14: 0x8000800,\n\t            0x15: 0x8000020,\n\t            0x16: 0x8020020,\n\t            0x17: 0x20000,\n\t            0x18: 0x0,\n\t            0x19: 0x20020,\n\t            0x1a: 0x8020000,\n\t            0x1b: 0x8000820,\n\t            0x1c: 0x8020820,\n\t            0x1d: 0x20800,\n\t            0x1e: 0x820,\n\t            0x1f: 0x8000000,\n\t            0x80000010: 0x20000,\n\t            0x80000011: 0x800,\n\t            0x80000012: 0x8020020,\n\t            0x80000013: 0x20820,\n\t            0x80000014: 0x20,\n\t            0x80000015: 0x8020000,\n\t            0x80000016: 0x8000000,\n\t            0x80000017: 0x8000820,\n\t            0x80000018: 0x8020820,\n\t            0x80000019: 0x8000020,\n\t            0x8000001a: 0x8000800,\n\t            0x8000001b: 0x0,\n\t            0x8000001c: 0x20800,\n\t            0x8000001d: 0x820,\n\t            0x8000001e: 0x20020,\n\t            0x8000001f: 0x8020800\n\t        }\n\t    ];\n\n\t    // Masks that select the SBOX input\n\t    var SBOX_MASK = [\n\t        0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,\n\t        0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f\n\t    ];\n\n\t    /**\n\t     * DES block cipher algorithm.\n\t     */\n\t    var DES = C_algo.DES = BlockCipher.extend({\n\t        _doReset: function () {\n\t            // Shortcuts\n\t            var key = this._key;\n\t            var keyWords = key.words;\n\n\t            // Select 56 bits according to PC1\n\t            var keyBits = [];\n\t            for (var i = 0; i < 56; i++) {\n\t                var keyBitPos = PC1[i] - 1;\n\t                keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;\n\t            }\n\n\t            // Assemble 16 subkeys\n\t            var subKeys = this._subKeys = [];\n\t            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {\n\t                // Create subkey\n\t                var subKey = subKeys[nSubKey] = [];\n\n\t                // Shortcut\n\t                var bitShift = BIT_SHIFTS[nSubKey];\n\n\t                // Select 48 bits according to PC2\n\t                for (var i = 0; i < 24; i++) {\n\t                    // Select from the left 28 key bits\n\t                    subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);\n\n\t                    // Select from the right 28 key bits\n\t                    subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);\n\t                }\n\n\t                // Since each subkey is applied to an expanded 32-bit input,\n\t                // the subkey can be broken into 8 values scaled to 32-bits,\n\t                // which allows the key to be used without expansion\n\t                subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);\n\t                for (var i = 1; i < 7; i++) {\n\t                    subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);\n\t                }\n\t                subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);\n\t            }\n\n\t            // Compute inverse subkeys\n\t            var invSubKeys = this._invSubKeys = [];\n\t            for (var i = 0; i < 16; i++) {\n\t                invSubKeys[i] = subKeys[15 - i];\n\t            }\n\t        },\n\n\t        encryptBlock: function (M, offset) {\n\t            this._doCryptBlock(M, offset, this._subKeys);\n\t        },\n\n\t        decryptBlock: function (M, offset) {\n\t            this._doCryptBlock(M, offset, this._invSubKeys);\n\t        },\n\n\t        _doCryptBlock: function (M, offset, subKeys) {\n\t            // Get input\n\t            this._lBlock = M[offset];\n\t            this._rBlock = M[offset + 1];\n\n\t            // Initial permutation\n\t            exchangeLR.call(this, 4,  0x0f0f0f0f);\n\t            exchangeLR.call(this, 16, 0x0000ffff);\n\t            exchangeRL.call(this, 2,  0x33333333);\n\t            exchangeRL.call(this, 8,  0x00ff00ff);\n\t            exchangeLR.call(this, 1,  0x55555555);\n\n\t            // Rounds\n\t            for (var round = 0; round < 16; round++) {\n\t                // Shortcuts\n\t                var subKey = subKeys[round];\n\t                var lBlock = this._lBlock;\n\t                var rBlock = this._rBlock;\n\n\t                // Feistel function\n\t                var f = 0;\n\t                for (var i = 0; i < 8; i++) {\n\t                    f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];\n\t                }\n\t                this._lBlock = rBlock;\n\t                this._rBlock = lBlock ^ f;\n\t            }\n\n\t            // Undo swap from last round\n\t            var t = this._lBlock;\n\t            this._lBlock = this._rBlock;\n\t            this._rBlock = t;\n\n\t            // Final permutation\n\t            exchangeLR.call(this, 1,  0x55555555);\n\t            exchangeRL.call(this, 8,  0x00ff00ff);\n\t            exchangeRL.call(this, 2,  0x33333333);\n\t            exchangeLR.call(this, 16, 0x0000ffff);\n\t            exchangeLR.call(this, 4,  0x0f0f0f0f);\n\n\t            // Set output\n\t            M[offset] = this._lBlock;\n\t            M[offset + 1] = this._rBlock;\n\t        },\n\n\t        keySize: 64/32,\n\n\t        ivSize: 64/32,\n\n\t        blockSize: 64/32\n\t    });\n\n\t    // Swap bits across the left and right words\n\t    function exchangeLR(offset, mask) {\n\t        var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;\n\t        this._rBlock ^= t;\n\t        this._lBlock ^= t << offset;\n\t    }\n\n\t    function exchangeRL(offset, mask) {\n\t        var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;\n\t        this._lBlock ^= t;\n\t        this._rBlock ^= t << offset;\n\t    }\n\n\t    /**\n\t     * Shortcut functions to the cipher's object interface.\n\t     *\n\t     * @example\n\t     *\n\t     *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);\n\t     *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);\n\t     */\n\t    C.DES = BlockCipher._createHelper(DES);\n\n\t    /**\n\t     * Triple-DES block cipher algorithm.\n\t     */\n\t    var TripleDES = C_algo.TripleDES = BlockCipher.extend({\n\t        _doReset: function () {\n\t            // Shortcuts\n\t            var key = this._key;\n\t            var keyWords = key.words;\n\t            // Make sure the key length is valid (64, 128 or >= 192 bit)\n\t            if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {\n\t                throw new Error('Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.');\n\t            }\n\n\t            // Extend the key according to the keying options defined in 3DES standard\n\t            var key1 = keyWords.slice(0, 2);\n\t            var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);\n\t            var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);\n\n\t            // Create DES instances\n\t            this._des1 = DES.createEncryptor(WordArray.create(key1));\n\t            this._des2 = DES.createEncryptor(WordArray.create(key2));\n\t            this._des3 = DES.createEncryptor(WordArray.create(key3));\n\t        },\n\n\t        encryptBlock: function (M, offset) {\n\t            this._des1.encryptBlock(M, offset);\n\t            this._des2.decryptBlock(M, offset);\n\t            this._des3.encryptBlock(M, offset);\n\t        },\n\n\t        decryptBlock: function (M, offset) {\n\t            this._des3.decryptBlock(M, offset);\n\t            this._des2.encryptBlock(M, offset);\n\t            this._des1.decryptBlock(M, offset);\n\t        },\n\n\t        keySize: 192/32,\n\n\t        ivSize: 64/32,\n\n\t        blockSize: 64/32\n\t    });\n\n\t    /**\n\t     * Shortcut functions to the cipher's object interface.\n\t     *\n\t     * @example\n\t     *\n\t     *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);\n\t     *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);\n\t     */\n\t    C.TripleDES = BlockCipher._createHelper(TripleDES);\n\t}());\n\n\n\treturn CryptoJS.TripleDES;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/tripledes.js?");

/***/ }),

/***/ "./node_modules/crypto-js/x64-core.js":
/*!********************************************!*\
  !*** ./node_modules/crypto-js/x64-core.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

eval(";(function (root, factory) {\n\tif (true) {\n\t\t// CommonJS\n\t\tmodule.exports = exports = factory(__webpack_require__(/*! ./core */ \"./node_modules/crypto-js/core.js\"));\n\t}\n\telse {}\n}(this, function (CryptoJS) {\n\n\t(function (undefined) {\n\t    // Shortcuts\n\t    var C = CryptoJS;\n\t    var C_lib = C.lib;\n\t    var Base = C_lib.Base;\n\t    var X32WordArray = C_lib.WordArray;\n\n\t    /**\n\t     * x64 namespace.\n\t     */\n\t    var C_x64 = C.x64 = {};\n\n\t    /**\n\t     * A 64-bit word.\n\t     */\n\t    var X64Word = C_x64.Word = Base.extend({\n\t        /**\n\t         * Initializes a newly created 64-bit word.\n\t         *\n\t         * @param {number} high The high 32 bits.\n\t         * @param {number} low The low 32 bits.\n\t         *\n\t         * @example\n\t         *\n\t         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);\n\t         */\n\t        init: function (high, low) {\n\t            this.high = high;\n\t            this.low = low;\n\t        }\n\n\t        /**\n\t         * Bitwise NOTs this word.\n\t         *\n\t         * @return {X64Word} A new x64-Word object after negating.\n\t         *\n\t         * @example\n\t         *\n\t         *     var negated = x64Word.not();\n\t         */\n\t        // not: function () {\n\t            // var high = ~this.high;\n\t            // var low = ~this.low;\n\n\t            // return X64Word.create(high, low);\n\t        // },\n\n\t        /**\n\t         * Bitwise ANDs this word with the passed word.\n\t         *\n\t         * @param {X64Word} word The x64-Word to AND with this word.\n\t         *\n\t         * @return {X64Word} A new x64-Word object after ANDing.\n\t         *\n\t         * @example\n\t         *\n\t         *     var anded = x64Word.and(anotherX64Word);\n\t         */\n\t        // and: function (word) {\n\t            // var high = this.high & word.high;\n\t            // var low = this.low & word.low;\n\n\t            // return X64Word.create(high, low);\n\t        // },\n\n\t        /**\n\t         * Bitwise ORs this word with the passed word.\n\t         *\n\t         * @param {X64Word} word The x64-Word to OR with this word.\n\t         *\n\t         * @return {X64Word} A new x64-Word object after ORing.\n\t         *\n\t         * @example\n\t         *\n\t         *     var ored = x64Word.or(anotherX64Word);\n\t         */\n\t        // or: function (word) {\n\t            // var high = this.high | word.high;\n\t            // var low = this.low | word.low;\n\n\t            // return X64Word.create(high, low);\n\t        // },\n\n\t        /**\n\t         * Bitwise XORs this word with the passed word.\n\t         *\n\t         * @param {X64Word} word The x64-Word to XOR with this word.\n\t         *\n\t         * @return {X64Word} A new x64-Word object after XORing.\n\t         *\n\t         * @example\n\t         *\n\t         *     var xored = x64Word.xor(anotherX64Word);\n\t         */\n\t        // xor: function (word) {\n\t            // var high = this.high ^ word.high;\n\t            // var low = this.low ^ word.low;\n\n\t            // return X64Word.create(high, low);\n\t        // },\n\n\t        /**\n\t         * Shifts this word n bits to the left.\n\t         *\n\t         * @param {number} n The number of bits to shift.\n\t         *\n\t         * @return {X64Word} A new x64-Word object after shifting.\n\t         *\n\t         * @example\n\t         *\n\t         *     var shifted = x64Word.shiftL(25);\n\t         */\n\t        // shiftL: function (n) {\n\t            // if (n < 32) {\n\t                // var high = (this.high << n) | (this.low >>> (32 - n));\n\t                // var low = this.low << n;\n\t            // } else {\n\t                // var high = this.low << (n - 32);\n\t                // var low = 0;\n\t            // }\n\n\t            // return X64Word.create(high, low);\n\t        // },\n\n\t        /**\n\t         * Shifts this word n bits to the right.\n\t         *\n\t         * @param {number} n The number of bits to shift.\n\t         *\n\t         * @return {X64Word} A new x64-Word object after shifting.\n\t         *\n\t         * @example\n\t         *\n\t         *     var shifted = x64Word.shiftR(7);\n\t         */\n\t        // shiftR: function (n) {\n\t            // if (n < 32) {\n\t                // var low = (this.low >>> n) | (this.high << (32 - n));\n\t                // var high = this.high >>> n;\n\t            // } else {\n\t                // var low = this.high >>> (n - 32);\n\t                // var high = 0;\n\t            // }\n\n\t            // return X64Word.create(high, low);\n\t        // },\n\n\t        /**\n\t         * Rotates this word n bits to the left.\n\t         *\n\t         * @param {number} n The number of bits to rotate.\n\t         *\n\t         * @return {X64Word} A new x64-Word object after rotating.\n\t         *\n\t         * @example\n\t         *\n\t         *     var rotated = x64Word.rotL(25);\n\t         */\n\t        // rotL: function (n) {\n\t            // return this.shiftL(n).or(this.shiftR(64 - n));\n\t        // },\n\n\t        /**\n\t         * Rotates this word n bits to the right.\n\t         *\n\t         * @param {number} n The number of bits to rotate.\n\t         *\n\t         * @return {X64Word} A new x64-Word object after rotating.\n\t         *\n\t         * @example\n\t         *\n\t         *     var rotated = x64Word.rotR(7);\n\t         */\n\t        // rotR: function (n) {\n\t            // return this.shiftR(n).or(this.shiftL(64 - n));\n\t        // },\n\n\t        /**\n\t         * Adds this word with the passed word.\n\t         *\n\t         * @param {X64Word} word The x64-Word to add with this word.\n\t         *\n\t         * @return {X64Word} A new x64-Word object after adding.\n\t         *\n\t         * @example\n\t         *\n\t         *     var added = x64Word.add(anotherX64Word);\n\t         */\n\t        // add: function (word) {\n\t            // var low = (this.low + word.low) | 0;\n\t            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;\n\t            // var high = (this.high + word.high + carry) | 0;\n\n\t            // return X64Word.create(high, low);\n\t        // }\n\t    });\n\n\t    /**\n\t     * An array of 64-bit words.\n\t     *\n\t     * @property {Array} words The array of CryptoJS.x64.Word objects.\n\t     * @property {number} sigBytes The number of significant bytes in this word array.\n\t     */\n\t    var X64WordArray = C_x64.WordArray = Base.extend({\n\t        /**\n\t         * Initializes a newly created word array.\n\t         *\n\t         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.\n\t         * @param {number} sigBytes (Optional) The number of significant bytes in the words.\n\t         *\n\t         * @example\n\t         *\n\t         *     var wordArray = CryptoJS.x64.WordArray.create();\n\t         *\n\t         *     var wordArray = CryptoJS.x64.WordArray.create([\n\t         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),\n\t         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)\n\t         *     ]);\n\t         *\n\t         *     var wordArray = CryptoJS.x64.WordArray.create([\n\t         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),\n\t         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)\n\t         *     ], 10);\n\t         */\n\t        init: function (words, sigBytes) {\n\t            words = this.words = words || [];\n\n\t            if (sigBytes != undefined) {\n\t                this.sigBytes = sigBytes;\n\t            } else {\n\t                this.sigBytes = words.length * 8;\n\t            }\n\t        },\n\n\t        /**\n\t         * Converts this 64-bit word array to a 32-bit word array.\n\t         *\n\t         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.\n\t         *\n\t         * @example\n\t         *\n\t         *     var x32WordArray = x64WordArray.toX32();\n\t         */\n\t        toX32: function () {\n\t            // Shortcuts\n\t            var x64Words = this.words;\n\t            var x64WordsLength = x64Words.length;\n\n\t            // Convert\n\t            var x32Words = [];\n\t            for (var i = 0; i < x64WordsLength; i++) {\n\t                var x64Word = x64Words[i];\n\t                x32Words.push(x64Word.high);\n\t                x32Words.push(x64Word.low);\n\t            }\n\n\t            return X32WordArray.create(x32Words, this.sigBytes);\n\t        },\n\n\t        /**\n\t         * Creates a copy of this word array.\n\t         *\n\t         * @return {X64WordArray} The clone.\n\t         *\n\t         * @example\n\t         *\n\t         *     var clone = x64WordArray.clone();\n\t         */\n\t        clone: function () {\n\t            var clone = Base.clone.call(this);\n\n\t            // Clone \"words\" array\n\t            var words = clone.words = this.words.slice(0);\n\n\t            // Clone each X64Word object\n\t            var wordsLength = words.length;\n\t            for (var i = 0; i < wordsLength; i++) {\n\t                words[i] = words[i].clone();\n\t            }\n\n\t            return clone;\n\t        }\n\t    });\n\t}());\n\n\n\treturn CryptoJS;\n\n}));\n\n//# sourceURL=webpack://safelinkify/./node_modules/crypto-js/x64-core.js?");

/***/ }),

/***/ "./src/aes.ts":
/*!********************!*\
  !*** ./src/aes.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar crypto_js_1 = __importDefault(__webpack_require__(/*! crypto-js */ \"./node_modules/crypto-js/index.js\"));\nvar salt = 'salt'; //salt\nvar iv = '1111111111111111'; //pass salt minimum length 12 chars\nvar iterations = 999; //iterations\n/**\n * Get key\n * @param {string} passphrase\n * @param {string} salt\n * @see {@link https://www.webmanajemen.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html}\n */\nfunction getKey(passphrase, salt) {\n    var key = crypto_js_1.default.PBKDF2(passphrase, salt, {\n        hasher: crypto_js_1.default.algo.SHA256,\n        keySize: 64 / 8,\n        iterations: iterations\n    });\n    return key;\n}\n/**\n * Encrypt function\n * @param {string} passphrase password\n * @param {string} plainText\n * @see {@link https://www.webmanajemen.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html}\n */\nfunction userJSEncrypt(passphrase, plainText, debug) {\n    if (debug === void 0) { debug = false; }\n    if (!plainText)\n        return null;\n    try {\n        var key = getKey(passphrase, salt);\n        var encrypted = crypto_js_1.default.AES.encrypt(plainText, key, {\n            iv: crypto_js_1.default.enc.Utf8.parse(iv)\n        });\n        var result = encrypted.ciphertext.toString(crypto_js_1.default.enc.Base64);\n        if (typeof result == 'string' && result.length)\n            return result;\n    }\n    catch (error) {\n        if (error instanceof Error && debug)\n            console.log('AES encrypt error', error.message, {\n                plainText: plainText,\n                passphrase: passphrase\n            });\n    }\n    return null;\n}\n/**\n * Decrypt function\n * @param {string} passphrase password\n * @param {string} encryptedText\n * @see {@link https://www.webmanajemen.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html}\n */\nfunction userJSDecrypt(passphrase, encryptedText, debug) {\n    if (debug === void 0) { debug = false; }\n    if (!encryptedText)\n        return null;\n    try {\n        var key = getKey(passphrase, salt);\n        var decrypted = crypto_js_1.default.AES.decrypt(encryptedText, key, {\n            iv: crypto_js_1.default.enc.Utf8.parse(iv)\n        });\n        var result = decrypted.toString(crypto_js_1.default.enc.Utf8);\n        if (typeof result == 'string' && result.length)\n            return result;\n    }\n    catch (error) {\n        if (error instanceof Error && debug)\n            console.log('AES decrypt error', error.message, {\n                encryptedText: encryptedText,\n                passphrase: passphrase\n            });\n    }\n    return null;\n}\n/**\n * @see {@link https://www.webmanajemen.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html}\n */\nexports[\"default\"] = {\n    encrypt: userJSEncrypt,\n    decrypt: userJSDecrypt\n};\n\n\n//# sourceURL=webpack://safelinkify/./src/aes.ts?");

/***/ }),

/***/ "./src/b64.ts":
/*!********************!*\
  !*** ./src/b64.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.b64 = void 0;\nvar crypto_js_1 = __importDefault(__webpack_require__(/*! crypto-js */ \"./node_modules/crypto-js/index.js\"));\nexports.b64 = {\n    encode: function (str) {\n        if (!str)\n            return null;\n        try {\n            var encodedWord = crypto_js_1.default.enc.Utf8.parse(str); // encodedWord Array object\n            return crypto_js_1.default.enc.Base64.stringify(encodedWord);\n        }\n        catch (error) {\n            //console.log('Error Base64 encode: ' + String(error));\n            return null;\n        }\n    },\n    decode: function (encoded) {\n        if (!encoded)\n            return null;\n        try {\n            var encodedWord = crypto_js_1.default.enc.Base64.parse(encoded); // encodedWord via Base64.parse()\n            return crypto_js_1.default.enc.Utf8.stringify(encodedWord);\n        }\n        catch (error) {\n            //console.log('Error Base64 decode: ' + String(error));\n            return null;\n        }\n    }\n};\nexports[\"default\"] = exports.b64;\n\n\n//# sourceURL=webpack://safelinkify/./src/b64.ts?");

/***/ }),

/***/ "./src/encryptionURL.ts":
/*!******************************!*\
  !*** ./src/encryptionURL.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar aes_1 = __importDefault(__webpack_require__(/*! ./aes */ \"./src/aes.ts\"));\nvar b64_1 = __importDefault(__webpack_require__(/*! ./b64 */ \"./src/b64.ts\"));\nvar _global_encryptionURL = (typeof window !== 'undefined' ? window : __webpack_require__.g);\n/**\n * resolve url encryption\n * @param url\n * @param passphrase\n * @returns\n */\nfunction encryptionURL(url, passphrase, debug) {\n    if (passphrase === void 0) { passphrase = 'root'; }\n    if (debug === void 0) { debug = false; }\n    /** Default Return Value */\n    var defaultRet = {\n        value: null,\n        base64: {\n            encode_redirector: null,\n            encode: null,\n            decode: null\n        },\n        aes: {\n            encode: null,\n            decode: null,\n            encode_redirector: null,\n            passphrase: passphrase\n        }\n    };\n    if (!url)\n        return defaultRet;\n    var value = url instanceof URL ? url.href : url;\n    /** BASE64 Decrypt */\n    var b64d = b64_1.default.decode(value);\n    /** BASE64 Encrypt */\n    var b64e = b64_1.default.encode(value);\n    /** AES Encrypt */\n    var aese = aes_1.default.encrypt(passphrase, value, debug);\n    /** AES Decrypt */\n    var aesd = aes_1.default.decrypt(passphrase, value, debug);\n    return Object.assign(defaultRet, {\n        value: value,\n        base64: {\n            encode: b64d ? null : b64e,\n            decode: b64d\n        },\n        aes: {\n            encode: aesd ? null : aese,\n            decode: aesd,\n            passphrase: passphrase\n        }\n    });\n}\nexports[\"default\"] = encryptionURL;\n_global_encryptionURL.encryptionURL = encryptionURL;\n\n\n//# sourceURL=webpack://safelinkify/./src/encryptionURL.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar parseQuery_1 = __importDefault(__webpack_require__(/*! ./parseQuery */ \"./src/parseQuery.ts\"));\nvar resolveQueryUrl_1 = __importDefault(__webpack_require__(/*! ./resolveQueryUrl */ \"./src/resolveQueryUrl.ts\"));\nvar safelink_1 = __importDefault(__webpack_require__(/*! ./safelink */ \"./src/safelink.ts\"));\nvar _global_safelinkify = (typeof window !== 'undefined' ? window : __webpack_require__.g);\nvar safelinkify;\n(function (safelinkify) {\n    safelinkify.resolveQueryUrl = resolveQueryUrl_1.default;\n    safelinkify.parseQuery = parseQuery_1.default;\n    safelinkify.safelink = safelink_1.default;\n    if ( true && module.exports) {\n        module.exports = safelinkify;\n    }\n    _global_safelinkify.safelinkify = safelinkify;\n})(safelinkify || (safelinkify = {}));\nexports[\"default\"] = safelinkify;\n\n\n//# sourceURL=webpack://safelinkify/./src/index.ts?");

/***/ }),

/***/ "./src/parseQuery.ts":
/*!***************************!*\
  !*** ./src/parseQuery.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.parseQuery = void 0;\nvar toURL_1 = __importDefault(__webpack_require__(/*! ./toURL */ \"./src/toURL.ts\"));\nvar _global_parseQuery = (typeof window !== 'undefined' ? window : __webpack_require__.g);\n/**\n * Parse Query URL and Hash\n * @param  query query key, null = return all objects\n * @param  url target query, ex: {@link location.href} or {@link location.search}\n */\nfunction parseQuery(query, url) {\n    // skip null, undefined\n    if (typeof url !== 'string')\n        return;\n    // skip empty string\n    if (url.length < 1)\n        return;\n    var result = {};\n    /**\n     * Query URL Parser\n     * @param str\n     * @returns\n     */\n    var parseQueries = function (str) {\n        var urlParams = new URLSearchParams(str);\n        return Object.fromEntries(urlParams);\n    };\n    if (url.match(/^(#|\\?)/)) {\n        url = 'http://not.actually.domain/' + url;\n    }\n    var parse = (0, toURL_1.default)(url);\n    if (parse) {\n        if (parse.hash) {\n            result = Object.assign(result, parseQueries(parse.hash.substring(1)));\n        }\n        if (parse.search) {\n            result = Object.assign(result, parseQueries(parse.search));\n        }\n    }\n    if (typeof query == 'string' && result.hasOwnProperty(query)) {\n        return result[query];\n    }\n    return result;\n}\nexports.parseQuery = parseQuery;\n_global_parseQuery.parseQuery = parseQuery;\nexports[\"default\"] = parseQuery;\n\n\n//# sourceURL=webpack://safelinkify/./src/parseQuery.ts?");

/***/ }),

/***/ "./src/resolveQueryUrl.ts":
/*!********************************!*\
  !*** ./src/resolveQueryUrl.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar encryptionURL_1 = __importDefault(__webpack_require__(/*! ./encryptionURL */ \"./src/encryptionURL.ts\"));\nvar parseQuery_1 = __webpack_require__(/*! ./parseQuery */ \"./src/parseQuery.ts\");\nvar toURL_1 = __importDefault(__webpack_require__(/*! ./toURL */ \"./src/toURL.ts\"));\nvar _global_resolveQueryUrl = (typeof window !== 'undefined' ? window : __webpack_require__.g);\n/**\n * Auto resolve url\n * * parse base64, aes\n * @param url url string or instance, null = {@link window.location.search}\n * @param passphrase aes password\n * @returns\n */\nfunction resolveQueryUrl(url, passphrase, debug) {\n    if (passphrase === void 0) { passphrase = 'root'; }\n    if (debug === void 0) { debug = false; }\n    var result = {};\n    var href = null;\n    if (url instanceof URL) {\n        href = url.href;\n    }\n    else if (typeof url == 'string') {\n        if (url.match(/^(#|\\?)/)) {\n            href = 'http://not.actually.domain/' + url;\n        }\n        else {\n            var parse = (0, toURL_1.default)(url);\n            if (parse !== null)\n                href = parse.href;\n        }\n    }\n    else if (typeof location == 'object' && typeof location.href == 'string') {\n        href = location.href;\n    }\n    if (!href || !href.match(/#|\\?/))\n        return null;\n    var parse_query_url = (0, parseQuery_1.parseQuery)(null, href);\n    if (typeof parse_query_url == 'object') {\n        Object.keys(parse_query_url).forEach(function (key) {\n            var value = parse_query_url[key];\n            result[key] = (0, encryptionURL_1.default)(value, passphrase, debug);\n        });\n    }\n    return result;\n}\nexports[\"default\"] = resolveQueryUrl;\n_global_resolveQueryUrl.resolveQueryUrl = resolveQueryUrl;\n\n\n//# sourceURL=webpack://safelinkify/./src/resolveQueryUrl.ts?");

/***/ }),

/***/ "./src/safelink.ts":
/*!*************************!*\
  !*** ./src/safelink.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar encryptionURL_1 = __importDefault(__webpack_require__(/*! ./encryptionURL */ \"./src/encryptionURL.ts\"));\nvar resolveQueryUrl_1 = __importDefault(__webpack_require__(/*! ./resolveQueryUrl */ \"./src/resolveQueryUrl.ts\"));\nvar string_1 = __webpack_require__(/*! ./string */ \"./src/string.ts\");\nvar toURL_1 = __importDefault(__webpack_require__(/*! ./toURL */ \"./src/toURL.ts\"));\nvar _global_safelink = (typeof window !== 'undefined' ? window : __webpack_require__.g);\nvar safelink = /** @class */ (function () {\n    function safelink(opt) {\n        this.options = {\n            exclude: [],\n            redirect: ['https://www.webmanajemen.com/page/safelink.html?url='],\n            password: 'root',\n            verbose: false,\n            type: 'base64'\n        };\n        if (typeof opt.redirect == 'string')\n            opt.redirect = [opt.redirect];\n        this.options = Object.assign(this.options, opt);\n    }\n    /**\n     * is url excluded\n     * @param url\n     * @returns\n     */\n    safelink.prototype.isExcluded = function (url) {\n        var excludes = this.options.exclude;\n        var value = String(url);\n        var parsed = url instanceof URL ? url : (0, toURL_1.default)(value);\n        // only process url with protocol\n        if (value.match(/^(?:(ht|f)tp(s?):\\/\\/)?/)) {\n            for (var i = 0; i < excludes.length; i++) {\n                var pattern = excludes[i];\n                if (typeof pattern == 'string' && typeof parsed === 'object' && parsed !== null) {\n                    // only validate full url\n                    if ((parsed.host || '').includes(pattern))\n                        return true;\n                }\n                else if (pattern instanceof RegExp) {\n                    if (value.match(pattern))\n                        return true;\n                }\n            }\n        }\n        return false;\n    };\n    /**\n     * parse html string or element to anonymize urls\n     * @param target\n     * @returns\n     */\n    safelink.prototype.parse = function (target) {\n        return __awaiter(this, void 0, void 0, function () {\n            var self, content, result, regex, processStr, matches, i, m, href, allMatch, wholeContents, processedHyperlink, processedContent, tagname, links, i, a, href, encryption, excluded, enc, randRedir;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        self = this;\n                        content = target;\n                        if (!(typeof target === 'string' || target instanceof HTMLElement)) return [3 /*break*/, 1];\n                        content = target;\n                        return [3 /*break*/, 4];\n                    case 1:\n                        if (!Buffer.isBuffer(target)) return [3 /*break*/, 2];\n                        content = (0, string_1.bufferToString)(target);\n                        return [3 /*break*/, 4];\n                    case 2: return [4 /*yield*/, (0, string_1.streamToString)(target)];\n                    case 3:\n                        content = _a.sent();\n                        _a.label = 4;\n                    case 4:\n                        result = null;\n                        if (typeof content === 'string' && content.trim().length > 0) {\n                            // make content as default result\n                            result = content;\n                            regex = /<a\\s+(?:[^>]*?\\s+)?href=([\"'])(.*?)\\1/gim;\n                            processStr = function (content, href) {\n                                var excluded = self.isExcluded(href);\n                                if (!excluded) {\n                                    var encryption = (0, encryptionURL_1.default)(href, self.options.password, self.options.verbose);\n                                    var enc = self.options.type == 'base64' ? encryption.base64.encode : encryption.aes.encode;\n                                    var randRedir = self.options.redirect[Math.floor(Math.random() * self.options.redirect.length)];\n                                    var newhref = randRedir + enc;\n                                    // return anonymized href\n                                    return content.replace(href, newhref);\n                                }\n                                // return original content\n                                return content;\n                            };\n                            matches = Array.from(content.matchAll(regex)).filter(function (m) { return m[2].trim().match(/^https?:\\/\\//); });\n                            for (i = 0; i < matches.length; i++) {\n                                m = matches[i];\n                                href = m[2].trim();\n                                allMatch = m[0];\n                                if (typeof href == 'string' && href.length > 0) {\n                                    wholeContents = typeof result == 'string' ? result : content;\n                                    if (typeof wholeContents === 'string') {\n                                        processedHyperlink = processStr(allMatch, href);\n                                        if (processedHyperlink) {\n                                            processedContent = wholeContents.replace(allMatch, processedHyperlink);\n                                            result = processedContent;\n                                        }\n                                    }\n                                }\n                            }\n                        }\n                        else if (content instanceof HTMLElement) {\n                            tagname = content.tagName.toLowerCase();\n                            if (tagname != 'a') {\n                                links = Array.from(content.querySelectorAll('a'));\n                                for (i = 0; i < links.length; i++) {\n                                    a = links[i];\n                                    if (!a.href)\n                                        continue;\n                                    href = (0, toURL_1.default)(a.href);\n                                    if (!href) {\n                                        console.log(a.href, null);\n                                        continue;\n                                    }\n                                    encryption = (0, encryptionURL_1.default)(href, self.options.password, self.options.verbose);\n                                    excluded = self.isExcluded(href);\n                                    if (self.options.verbose) {\n                                        console.log(Object.assign(encryption, {\n                                            url: href.href,\n                                            isExcluded: excluded\n                                        }));\n                                    }\n                                    if (!excluded) {\n                                        enc = self.options.type == 'base64' ? encryption.base64.encode : encryption.aes.encode;\n                                        randRedir = self.options.redirect[Math.floor(Math.random() * self.options.redirect.length)];\n                                        a.href = randRedir + enc;\n                                        a.target = '_blank';\n                                        a.rel = 'nofollow noopener noreferer';\n                                    }\n                                }\n                                result = content.outerHTML;\n                            }\n                        }\n                        return [2 /*return*/, result];\n                }\n            });\n        });\n    };\n    /**\n     * anonymize url directly\n     * @param href\n     */\n    safelink.prototype.encodeURL = function (href) {\n        var self = this;\n        var encryption = (0, encryptionURL_1.default)(href, self.options.password, self.options.verbose);\n        var enc = self.options.type == 'base64' ? encryption.base64.encode : encryption.aes.encode;\n        var randRedir = self.options.redirect[Math.floor(Math.random() * self.options.redirect.length)];\n        var newhref = randRedir + enc;\n        return newhref;\n    };\n    /**\n     * Resolve query url to decrypt anonymized urls (page redirector)\n     * @param search\n     * @returns\n     */\n    safelink.prototype.resolveQueryUrl = function (search) {\n        var self = this;\n        var obj = (0, resolveQueryUrl_1.default)(typeof search == 'string'\n            ? search\n            : typeof location == 'object' && typeof location.search == 'string'\n                ? location.search\n                : null, this.options.password, this.options.verbose);\n        if (obj !== null && typeof obj === 'object') {\n            Object.keys(obj).forEach(function (key) {\n                var encryptions = obj[key];\n                if (encryptions.aes.encode) {\n                    encryptions.aes.encode_redirector = self.options.redirect + encryptions.aes.encode;\n                }\n                if (encryptions.base64.encode) {\n                    encryptions.base64.encode_redirector = self.options.redirect + encryptions.base64.encode;\n                }\n            });\n        }\n        return obj;\n    };\n    return safelink;\n}());\nexports[\"default\"] = safelink;\n_global_safelink.safelink = safelink;\n\n\n//# sourceURL=webpack://safelinkify/./src/safelink.ts?");

/***/ }),

/***/ "./src/string.ts":
/*!***********************!*\
  !*** ./src/string.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.bufferToString = exports.streamToString = exports.capitalizer = exports.escapeRegex = void 0;\n/**\n * escape regex string\n * @param string\n * @returns\n */\nfunction escapeRegex(string, method) {\n    if (method === void 0) { method = '1'; }\n    if (method === '1' || !method)\n        return string.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');\n    // Escape characters with special meaning either inside or outside character sets.\n    // Use a simple backslash escape when it’s always valid, and a `\\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.\n    if (method === '2')\n        return string.replace(/[|\\\\{}()[\\]^$+*?.]/g, '\\\\$&').replace(/-/g, '\\\\x2d');\n}\nexports.escapeRegex = escapeRegex;\n/**\n * capitalize string first letter of each word which mixed with symbols\n * @param str\n * @param moreSymbols add more symbols\n * @returns\n */\nfunction capitalizer(str, moreSymbols) {\n    if (moreSymbols === void 0) { moreSymbols = []; }\n    var symbols = ['-', ' '];\n    if (Array.isArray(moreSymbols)) {\n        // concatenate more symbols\n        symbols = symbols.concat(moreSymbols).filter(function (x, i, a) {\n            return a.indexOf(x) === i;\n        });\n    }\n    symbols.forEach(function (symbol) {\n        str = str\n            .split(symbol)\n            .map(function (str) { return str.charAt(0).toUpperCase() + str.slice(1); })\n            .join(symbol);\n    });\n    return str;\n}\nexports.capitalizer = capitalizer;\n/**\n * Stream to string\n * @param stream\n * @returns\n */\nfunction streamToString(stream) {\n    var chunks = [];\n    return new Promise(function (resolve, reject) {\n        stream.on('data', function (chunk) { return chunks.push(Buffer.from(chunk)); });\n        stream.on('error', function (err) { return reject(err); });\n        stream.on('end', function () { return resolve(Buffer.concat(chunks).toString('utf8')); });\n    });\n}\nexports.streamToString = streamToString;\n/**\n * Buffer to string\n * @param array\n * @returns\n */\nfunction bufferToString(array) {\n    if (typeof Uint8Array !== 'undefined' && typeof TextDecoder !== 'undefined') {\n        var td = new TextDecoder();\n        var ua = new Uint8Array(array);\n        return td.decode(ua);\n    }\n    else {\n        return array.toString();\n    }\n}\nexports.bufferToString = bufferToString;\n\n\n//# sourceURL=webpack://safelinkify/./src/string.ts?");

/***/ }),

/***/ "./src/toURL.ts":
/*!**********************!*\
  !*** ./src/toURL.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.fixUrl = exports.isValidHttpUrl = void 0;\n/**\n * is url valid\n * @param string\n * @returns\n */\nfunction isValidHttpUrl(string) {\n    var url;\n    try {\n        url = new URL(string);\n    }\n    catch (_) {\n        return false;\n    }\n    return url.protocol === 'http:' || url.protocol === 'https:';\n}\nexports.isValidHttpUrl = isValidHttpUrl;\n/**\n * fix url\n * * doubled slashes\n * @param url\n * @returns\n */\nfunction fixUrl(url) {\n    var str;\n    if (typeof url === 'string') {\n        str = url;\n    }\n    else {\n        str = url.toString();\n    }\n    return str.replace(/([^:]\\/)\\/+/g, '$1');\n}\nexports.fixUrl = fixUrl;\n/**\n * transform url string to {@link Nullable}<{@link URL}>\n * @param url\n * @returns\n */\nfunction toURL(url) {\n    try {\n        if (url.startsWith('/') || url.startsWith('?')) {\n            // url is pathname or query\n            return new URL('http://not-actually-domain.com/' + url.replace(/^\\/+/, ''));\n        }\n        else if (url.match(/^https?:\\/\\//)) {\n            // test full url with protocol://\n            return new URL(url);\n        }\n    }\n    catch (error) {\n        if (error instanceof Error)\n            console.log(url, error.message);\n        return null;\n    }\n}\nexports[\"default\"] = toURL;\n\n\n//# sourceURL=webpack://safelinkify/./src/toURL.ts?");

/***/ }),

/***/ "?9157":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://safelinkify/crypto_(ignored)?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("0215a17340aee613d26d")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "safelinkify:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			};
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		this["webpackHotUpdatesafelinkify"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});