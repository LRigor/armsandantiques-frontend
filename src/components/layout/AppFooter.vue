<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useVisitorStore } from '@/stores/visitors'
import IconPinterest from '@/components/icons/IconPinterest.vue'
import IconPaymentMasterCard from '@/components/icons/IconPaymentMasterCard.vue'
import IconPaymentPayPal from '@/components/icons/IconPaymentPayPal.vue'
import IconPaymentVisa from '@/components/icons/IconPaymentVisa.vue'
import IconShareFacebook from '@/components/icons/IconShareFacebook.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import IconTwitter from '@/components/icons/IconTwitter.vue'
import IconVK from '@/components/icons/IconVK.vue'
import IconSnapchat from '@/components/icons/IconSnapchat.vue'
import IconPinterestAlt from '@/components/icons/IconPinterestAlt.vue'

useVisitorStore().fetchVisitorCount()
</script>

<template>
  <footer class="text-white">
    <div class="bg-black">
      <div class="max-w-7xl mx-auto px-10 py-8 md:py-16">
        <!-- Mobile: Single column layout -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-0 text-sm lg:text-lg md:text-xl">
          <!-- Items for Sale - Full width on mobile, 2 columns on desktop -->
          <div
            class="flex flex-col gap-4 col-span-2 border-b sm:border-b-0 border-gray-600 pb-4 sm:pb-0"
          >
            <h2 class="font-bold">Items for Sale</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ul class="text-gray-400 grid grid-cols-2 sm:grid-cols-1 gap-2">
                <li><RouterLink to="/for-sale/india">India</RouterLink></li>
                <li>
                  <RouterLink to="/for-sale/china-east-asia-tibet">China, East Asia,</RouterLink>
                </li>
                <li><RouterLink to="/for-sale/tibet">Tibet</RouterLink></li>
                <li>
                  <RouterLink to="/for-sale/middle-east-ottoman-turkey-persia">
                    Middle East,
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/for-sale/ottoman-turkey-persia">Ottoman Turkey,</RouterLink>
                </li>
                <li><RouterLink to="/for-sale/persia">Persia</RouterLink></li>
                <li><RouterLink to="/for-sale/europe">Europe</RouterLink></li>
                <li><RouterLink to="/for-sale/islamic-antiques">Islamic Antiques</RouterLink></li>
              </ul>
              <ul
                class="text-gray-400 grid grid-cols-2 sm:flex sm:flex-col gap-2 border-t sm:border-t-0 border-gray-600 pt-4 sm:pt-0"
              >
                <li><RouterLink to="/for-sale/swords">Swords</RouterLink></li>
                <li><RouterLink to="/for-sale/daggers">Daggers</RouterLink></li>
                <li><RouterLink to="/for-sale/antiques">Antiques</RouterLink></li>
                <li><RouterLink to="/for-sale/armor">Armor</RouterLink></li>
              </ul>
            </div>
          </div>

          <!-- Archive -->
          <div class="flex flex-col gap-4">
            <h2 class="font-bold">Archive</h2>
            <ul class="text-gray-400 flex flex-col gap-2">
              <li><RouterLink to="/sold">Sold Items</RouterLink></li>
              <li><RouterLink to="/museum">Museum of the World</RouterLink></li>
              <li><RouterLink to="/our-library">Our library</RouterLink></li>
            </ul>
          </div>

          <!-- Information -->
          <div class="flex flex-col gap-4">
            <h2 class="font-bold">Information</h2>
            <ul class="text-gray-400 flex flex-col gap-2">
              <li><RouterLink to="/about">About Us</RouterLink></li>
              <li><RouterLink to="/free-shipping">Free Shipping</RouterLink></li>
              <li><RouterLink to="/terms">Terms of Sale</RouterLink></li>
              <li><RouterLink to="/guarantee">100% Guarantee</RouterLink></li>
              <li><RouterLink to="/sell-to-us">Sell to Us</RouterLink></li>
              <li>
                <a href="/public/docs/AAA_Privacy_Policy.pdf" target="_blank">Privacy Policy</a>
              </li>
            </ul>
          </div>

          <!-- Contact, Social, Payment -->
          <div
            class="flex flex-col gap-6 border-t sm:border-t-0 border-gray-600 pt-4 sm:pt-0 col-span-2 sm:col-span-1"
          >
            <div class="flex flex-col gap-2">
              <h2 class="font-bold">Contact Us</h2>
              <h3 class="text-gray-400 text-base md:text-lg mt-2">
                <a href="tel:+18559273393">+1 (855) 927-3393</a>
              </h3>
              <h3 class="text-gray-400 text-base md:text-lg">
                <a href="mailto:info@islamicantiques.com">info@islamicantiques.com</a>
              </h3>
            </div>
            <div class="flex flex-col gap-4 border-t sm:border-t-0 border-gray-600 pt-4 sm:pt-0">
              <h2 class="font-bold">Follow Us</h2>
              <div class="flex flex-row gap-4 items-center">
                <a href="https://www.pinterest.com/lapa3443/wwwarmsandantiquescom/" target="_blank">
                  <IconPinterest class="cursor-pointer" />
                </a>
                <a href="https://www.instagram.com/armsandantiques/" target="_blank">
                  <IconInstagram class="cursor-pointer" />
                </a>
              </div>
            </div>
            <div class="flex flex-col gap-4 border-t sm:border-t-0 border-gray-600 pt-4 sm:pt-0">
              <h2 class="font-bold">Payment</h2>
              <div class="flex flex-row gap-4 items-center">
                <IconPaymentMasterCard />
                <IconPaymentPayPal />
                <IconPaymentVisa />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-[#1b1b1b]">
      <div
        class="flex flex-col sm:flex-row justify-center items-center max-w-7xl mx-auto px-4 py-6 md:py-8 text-white gap-4"
      >
        <span class="text-lg md:text-xl">Share</span>
        <div class="flex flex-row gap-4">
          <a target="_blank">
            <IconShareFacebook class="cursor-pointer" />
          </a>
          <a target="_blank">
            <IconPinterestAlt class="cursor-pointer" />
          </a>
          <a target="_blank">
            <IconTwitter class="cursor-pointer" />
          </a>
          <a target="_blank">
            <IconVK class="cursor-pointer" />
          </a>
          <a target="_blank">
            <IconSnapchat class="cursor-pointer" />
          </a>
        </div>
      </div>

      <div
        class="flex flex-col md:flex-row justify-between items-center border-t border-[#858585] pt-6 md:pt-8 max-w-7xl mx-auto px-4 py-6 md:py-8 text-base md:text-xl gap-4 md:gap-0"
      >
        <div
          class="flex flex-col md:flex-row gap-2 md:gap-4 text-gray-400 text-center md:text-left"
        >
          <p>Copyright &copy; 2025 Arms And Antiques, Inc. All Rights Reserved.</p>
          <div class="hidden md:block w-[1px] h-full bg-gray-400"></div>
          <p>
            Total Visitors:
            {{ useVisitorStore().visitorCount }}
          </p>
        </div>
        <a href="https://red-is.ru/" target="_blank" class="text-white text-center md:text-left"
          >Designed by Redis</a
        >
      </div>
    </div>
  </footer>
</template>
