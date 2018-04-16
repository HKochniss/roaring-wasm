import roaringWasm = require('./lib/roaring-wasm')
import RoaringTypedArray = require('./lib/RoaringTypedArray')

/**
 * Array of bytes allocted directly in roaring library WASM memory.
 * Note: Meory is not garbage collected, you are responsible to free the allocated memory calling "dispose" method.
 *
 * @class RoaringUint8Array
 */
class RoaringUint8Array extends RoaringTypedArray<Uint8Array> {
  public get BYTES_PER_ELEMENT(): number {
    return 1
  }

  public get byteLength(): number {
    return this.byteOffset
  }

  public get heap(): Uint8Array {
    return roaringWasm.HEAPU8
  }

  /**
   * Allocates an array in the roaring WASM heap.
   * Note: Meory is not garbage collected, you are responsible to free the allocated memory calling "dispose" method.
   * @param {number} length Number of elements to allocate.
   */
  public constructor(lengthOrArray: number | Uint8Array | ReadonlyArray<number>) {
    super(lengthOrArray, 1)
  }

  /**
   * Gets a new Uint8Array instance that shares the memory used by this buffer.
   * Note that the buffer may become invalid if the WASM allocated memory grows.
   * Use the returned array for short periods of time.
   *
   * @returns {Uint8Array} A new instance of Uint8Array
   */
  public asTypedArray(): Uint8Array {
    return new Uint8Array(roaringWasm.wasmMemory.buffer, this.byteOffset, this.length)
  }

  /**
   * Gets a new Buffer instance that shares the memory used by this buffer.
   * Note that the buffer may become invalid if the WASM allocated memory grows.
   * Use the returned array for short periods of time.
   *
   * @returns {Buffer} A new instance of node Buffer
   */
  public asNodeBuffer(): Buffer {
    return Buffer.from(roaringWasm.wasmMemory.buffer, this.byteOffset, this.length)
  }
}

export = RoaringUint8Array