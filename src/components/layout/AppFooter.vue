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
      <div class="max-w-7xl mx-auto px-4 py-16 grid grid-cols-5 justify-between text-xl">
        <div class="flex flex-col gap-4 col-span-2">
          <h2>Items for Sale</h2>
          <div class="grid grid-cols-2 gap-4">
            <ul class="text-gray-400 flex flex-col gap-2">
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
              <li><RouterLink to="/for-sale/ottoman-turkey-persia">Ottoman Turkey,</RouterLink></li>
              <li><RouterLink to="/for-sale/persia">Persia</RouterLink></li>
              <li><RouterLink to="/for-sale/europe">Europe</RouterLink></li>
              <li><RouterLink to="/for-sale/islamic-antiques">Islamic Antiques</RouterLink></li>
            </ul>
            <ul class="text-gray-400 flex flex-col gap-2">
              <li><RouterLink to="/for-sale/swords">Swords</RouterLink></li>
              <li><RouterLink to="/for-sale/daggers">Daggers</RouterLink></li>
              <li><RouterLink to="/for-sale/antiques">Antiques</RouterLink></li>
              <li><RouterLink to="/for-sale/armor">Armor</RouterLink></li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <h2>Archive</h2>
          <ul class="text-gray-400 flex flex-col gap-2">
            <li><RouterLink to="/sold">Sold Items</RouterLink></li>
            <li><RouterLink to="/museum">Museum of the World</RouterLink></li>
            <li><RouterLink to="/our-library">Our library</RouterLink></li>
          </ul>
        </div>
        <div class="flex flex-col gap-4">
          <h2>Information</h2>
          <ul class="text-gray-400 flex flex-col gap-2">
            <li><RouterLink to="/about">About Us</RouterLink></li>
            <li><RouterLink to="/free-shipping">Free Shipping</RouterLink></li>
            <li><RouterLink to="/terms">Terms of Sale</RouterLink></li>
            <li><RouterLink to="/guarantee">100% Guarantee</RouterLink></li>
            <li><RouterLink to="/sell-to-us">Sell to Us</RouterLink></li>
            <li><RouterLink to="/privacy">Privacy Policy</RouterLink></li>
          </ul>
        </div>
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <h2>Contact Us</h2>
            <h3 class="text-gray-400 text-lg mt-2">
              <a href="tel:+18559273393">+1 (855) 927-3393</a>
            </h3>
            <h3 class="text-gray-400 text-lg">
              <a href="mailto:info@islamicantiques.com">info@islamicantiques.com</a>
            </h3>
          </div>
          <div class="flex flex-col gap-4">
            <h2>Follow Us</h2>
            <div class="flex flex-row gap-4 items-center">
              <a href="https://www.pinterest.com/lapa3443/wwwarmsandantiquescom/" target="_blank">
                <IconPinterest class="cursor-pointer" />
              </a>
              <a href="https://www.instagram.com/armsandantiques/" target="_blank">
                <IconInstagram class="cursor-pointer" />
              </a>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <h2>Payment</h2>
            <div class="flex flex-row gap-4 items-center">
              <IconPaymentMasterCard />
              <IconPaymentPayPal />
              <IconPaymentVisa />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-[#1b1b1b]">
      <div
        class="flex flex-row justify-center items-center max-w-7xl mx-auto px-4 py-8 text-white gap-4"
      >
        <span class="text-xl">Share</span>
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

      <div
        class="flex justify-between items-center border-t border-[#858585] pt-8 max-w-7xl mx-auto px-4 py-8 text-xl"
      >
        <div class="flex flex-row gap-4 text-gray-400">
          <p>Copyright &copy; 2025 Arms And Antiques, Inc. All Rights Reserved.</p>
          <p class="w-[1px] h-hull bg-gray-400"></p>
          <p>
            Total Visitors:
            {{ useVisitorStore().visitorCount }}
          </p>
        </div>
        <a href="https://red-is.ru/" target="_blank" class="text-white">Designed by Redis</a>
      </div>
    </div>
  </footer>
</template>
